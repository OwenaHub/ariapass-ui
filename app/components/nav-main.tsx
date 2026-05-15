import { NavLink } from "react-router";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { APP_MENU } from "~/routes/_user/app-menu";

export function NavMain() {
  return (
    <SidebarMenu>
      {APP_MENU.map((item) => (
        <SidebarMenuItem key={item.title} className="mb-3">
          <SidebarMenuButton className="py-5 text-sm" asChild>
            <NavLink to={item.url} className="flex items-center gap-3 w-full">
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center justify-center rounded p-1.5 transition-colors duration-200 ${isActive
                      ? 'bg-theme text-white'
                      : 'text-primary group-hover:text-slate-800'
                      }`}
                  >
                    {item.icon}
                  </div>

                  <span className={isActive ? "font-semibold text-theme" : "text-primary"}>
                    {item.title}
                  </span>
                </>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}