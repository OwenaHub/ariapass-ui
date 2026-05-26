import { Outlet, type MetaFunction } from "react-router";
import type { Route } from "./+types/route";
import RootLayoutFooter from "./footer";
import NavigationBar from "./navigation-bar";
import { getSession } from "~/session.server";
import { defaultMeta } from "~/lib/meta";

export const meta: MetaFunction = (args) => {
  return [
    ...defaultMeta(args) || [],
    { title: "AriaPass | Discover Concerts For You" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  return { user }
}

export default function HomeLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#F08D39] selection:text-white">
      <NavigationBar user={user} />

      <div>
        <Outlet context={user} />
      </div>

      <RootLayoutFooter />
    </div>
  );
}