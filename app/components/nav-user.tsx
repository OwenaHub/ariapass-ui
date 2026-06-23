import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Link } from "react-router"

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link to="/" className='flex flex-col items-center z-50 cursor-pointer'>
              <SidebarMenuButton
                size="lg"
              >
                <img src="/images/logos/app_logo.png" alt="AriaPass Logo" className="h-auto w-30 object-contain" />
              </SidebarMenuButton>
            </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
