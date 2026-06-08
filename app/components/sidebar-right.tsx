import * as React from "react"

import { DatePicker } from "~/components/date-picker"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "~/components/ui/sidebar"
import { RiAddLine, RiBookmark2Fill } from "@remixicon/react"
import { Button } from "./ui/button"
import { Link } from "react-router"
import { Text } from "./ui/text"
import { genreCategories } from "~/lib/categories"


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
        <section className="mb-8 p-4">
          <Text.p className="mb-3 font-medium">
            Quick search
          </Text.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 w-full">
            {genreCategories.slice(1).map((category) => (
                <div key={category.href} className={`relative rounded overflow-hidden ${category.theme} aspect-square`}>
                  <Link to={`${category.href}`}>
                    <span aria-hidden="true" className="z-10 absolute inset-0" />
                  </Link>

                  <div className="absolute flex items-start justify-between top-2 right-0 py-0.5 px-2.5 z-20">
                    <RiBookmark2Fill size={16} className="text-white" />
                  </div>

                  {/* Perfectly centered using absolute positioning and translation */}
                  <Text.p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-sm! text-center w-full font-bold px-2 pointer-events-none">
                    <span className="">
                      {category.title.split(" ")[0]}
                      {" "} <br />
                      {category.title.split(" ")[1]}
                    </span>
                  </Text.p>
              </div>
            ))}
          </div>
        </section>
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
