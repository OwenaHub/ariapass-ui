import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import RootLayoutFooter from "./footer";
import NavigationBar from "./navigation-bar";
import { getSession } from "~/session.server";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
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