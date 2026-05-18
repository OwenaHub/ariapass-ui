import * as React from "react"

import { Calendars } from "~/components/calendars"
import { DatePicker } from "~/components/date-picker"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "~/components/ui/sidebar"
import { RiAddLine } from "@remixicon/react"
import { Button } from "./ui/button"
import { Link } from "react-router"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function SidebarRight({ ...props }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-s lg:flex"
      {...props}
    >
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={'/my-events/new'}>
              <Button variant={'brand'} className="w-full justify-start gap-2">
                <RiAddLine
                />
                <span>New Event</span>
              </Button>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
