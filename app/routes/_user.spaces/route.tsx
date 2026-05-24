import { Suspense } from "react";
import { Await, Link, redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/route";
import { extractNames } from "~/lib/utils";
import AvatarGroup from "~/components/custom/avatar-group";
import { requireUser } from "~/lib/auth.server";
import { handleActionError } from "~/lib/logger.server";
import { RiLoader4Line, RiSquareLine, RiUserReceivedLine } from "@remixicon/react";
import { getUserSpaces } from "~/handlers/user/events";
import { getOrganiserSpaces } from "~/handlers/organiser/events";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);

  try {
    const isOrganiser = Boolean(user && user.organiserProfile);

    const [invitedSpaces, ownedSpaces] = await Promise.all([
      getUserSpaces(request, 'spaces/invited'),
      isOrganiser ? getOrganiserSpaces(request, 'spaces') : Promise.resolve([]),
    ]);

    return { collaborations: Promise.resolve([invitedSpaces, ownedSpaces]) };
  } catch (error: any) {
    handleActionError(error);
    return redirect('/dashboard');
  }
}

export default function Spaces({ loaderData }: Route.ComponentProps) {
  const { collaborations } = loaderData;
  const user: any = useOutletContext();

  const SpaceCard = ({ space, user, type }: { space: any, user: any, type: 'invited' | 'owned' }) => {
    const isInvited = type === 'invited';
    const userRole = isInvited ? space.members.find((mem: any) => mem.email === user.email) : null;

    return (
      <Link to={`/spaces/${space.slug}`} className="group block bg-white border p-4 rounded hover:border-indigo-300 transition-all">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center w-full justify-between">
            <span className="text-xs font-bold text-gray-500">
              {isInvited ? `Invited as ${userRole?.role || 'Member'}` : 'Owner'}
            </span>
          </div>
        </div>

        <h4 className="font-bold text-gray-900 tracking-tight mb-2 truncate">{space.title}</h4>

        <div className="flex items-center justify-between">
          <AvatarGroup names={extractNames(space.members)} max={3} />
          <RiSquareLine className="size-4 text-gray-300 group-hover:text-indigo-600 transition-colors" />
        </div>
      </Link>
    );
  };

  return (
    <div className="container py-8">
      <section>
        <Suspense fallback={<RiLoader4Line className="size-12 text-gray-500 animate-spin mx-auto" />}>
          <Await resolve={collaborations}>
            {([invitedSpaces, ownedSpaces]) => {
              const hasSpaces = invitedSpaces?.length > 0 || ownedSpaces?.length > 0;

              return hasSpaces ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {ownedSpaces?.map((space: any) => (
                    <SpaceCard key={`owned-${space.id}`} space={space} user={user} type="owned" />
                  ))}
                  {invitedSpaces?.map((space: any) => (
                    <SpaceCard key={`invited-${space.id}`} space={space} user={user} type="invited" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RiSquareLine className="size-5 text-gray-300" />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mb-1">No collaborations</p>
                  <p className="text-xs text-gray-400">When invited to an event, it will appear here.</p>
                </div>
              );
            }}
          </Await>
        </Suspense>
      </section>
    </div>
  )
}
