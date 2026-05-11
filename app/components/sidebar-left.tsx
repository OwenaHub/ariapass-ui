import * as React from "react"

import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"
import { RiSettingsLine, RiQuestionLine } from "@remixicon/react"
import { NavUser } from "./nav-user"

const data = {
  navSecondary: [
    {
      title: "Account",
      url: "account",
      icon: (<RiSettingsLine />),
    },
    {
      title: "Help",
      url: "#",
      icon: (<RiQuestionLine />),
    },
  ],
}
type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

export function SidebarLeft({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar className="border-e-0" {...props}>
      <SidebarHeader className="flex flex-col gap-6">
        <NavUser user={user} />
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
