import { Await, Link, useOutletContext, type MetaFunction } from "react-router";
import NavigationSection from "./navigation-section";
import OrganiserProfileStatus from "./organiser-profile-status";
import type { Route } from "../_user.home/+types/route";
import { handleActionError } from "~/lib/logger.server";
import { getGuestEvents } from "~/handlers/user/events";
import { Suspense } from "react";
import EventCardSkeleton from "~/components/custom/events-card-skeleton";
import EventsMapper from "~/components/custom/event-mapper";
import { defaultMeta } from "~/lib/meta";
import { RiSearchAi2Line } from "@remixicon/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
    return [
        ...defaultMeta(),
        { title: "Home | AriaPass" },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const events: Promise<OrganiserEvent[]> = getGuestEvents(request, 'events/')
        .catch((error) => {
            handleActionError(error);
            return null;
        });

    return { events };
}

export default function UserDashboard({ loaderData }: Route.ComponentProps) {
    const user: any = useOutletContext();
    const { events } = loaderData;

    return (
        <div className="container pb-20 md:pb-0">
            <OrganiserProfileStatus user={user} />
            <NavigationSection user={user} />

            <div className="mb-10">
                <Suspense fallback={<EventCardSkeleton />}>
                    <Await resolve={events}>
                        {(events) => <EventsMapper events={events} />}
                    </Await>
                </Suspense>
            </div>

            <Link to="/">
                <Button
                    variant={"brand"}
                    size={'lg'}
                    className="md:w-max mx-auto w-full flex items-center gap-2 text-sm mb-4"
                >
                    <RiSearchAi2Line size={18} />
                    <span>Better recommendations</span>
                </Button>
            </Link>
        </div>
    );
}