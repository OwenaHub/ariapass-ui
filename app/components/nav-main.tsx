import { Link, useLocation } from "react-router";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => {
        // 1. We still calculate if this specific route is active
        const isActive = location.pathname === item.url;

        return (
          <SidebarMenuItem key={item.title} className="mb-3">
            <SidebarMenuButton className="py-5 text-sm" asChild isActive={isActive}>
              <Link to={item.url} className="flex items-center gap-3">

                <div
                  className={`flex items-center justify-center rounded-md p-1.5 transition-colors duration-200 ${isActive
                      ? 'bg-theme text-white' // Active: gets your background and makes icon white
                      : 'text-slate-500 group-hover:text-slate-900' // Inactive: standard colors
                    }`}
                >
                  {item.icon}
                </div>

                <span className={isActive ? "font-semibold text-theme" : "text-slate-600"}>
                  {item.title}
                </span>

              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}