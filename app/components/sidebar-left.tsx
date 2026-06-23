import * as React from "react"

import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"
import { RiQuestionLine, RiUserLine } from "@remixicon/react"
import { NavUser } from "./nav-user"

const data = {
  navSecondary: [
    {
      title: "Account",
      url: "/account",
      icon: (<RiUserLine />),
    },
    {
      title: "Help",
      url: "/help",
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
        <NavUser />
        <NavMain />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary user={user} items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
