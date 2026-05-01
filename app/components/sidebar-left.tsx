import * as React from "react"

import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"
import { RiSearchLine, RiSparklingLine, RiHomeLine, RiInboxLine, RiSettingsLine, RiQuestionLine } from "@remixicon/react"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: (
        <RiHomeLine
        />
      ),
      isActive: true,
    },
    {
      title: "Favourites",
      url: "favourites",
      icon: (
        <RiSparklingLine
        />
      ),
    },
    {
      title: "Search",
      url: "search",
      icon: (
        <RiSearchLine
        />
      ),
    },
    {
      title: "My Events",
      url: "my-events",
      icon: (
        <RiInboxLine
        />
      ),
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Account",
      url: "account",
      icon: (
        <RiSettingsLine
        />
      ),
    },
    {
      title: "Help",
      url: "#",
      icon: (
        <RiQuestionLine
        />
      ),
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
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
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavFavoritee favorites={data.favorites} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
