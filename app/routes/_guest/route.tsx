import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import RootLayoutFooter from "./footer";
import NavigationBar from "./navigation-bar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#F08D39] selection:text-white">
      <NavigationBar />

      <div>
        <Outlet />
      </div>

      <RootLayoutFooter />
    </div>
  );
}