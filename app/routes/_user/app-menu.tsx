import { RiCalendarEventFill, RiHomeFill, RiSearchLine, RiSparklingFill } from "@remixicon/react";

export const APP_MENU = [
    {
        title: "Home",
        url: "/home",
        icon: (<RiHomeFill />),
        isActive: true,
    },
    {
        title: "Favourites",
        url: "/favourites",
        icon: (<RiSparklingFill />),
    },
    {
        title: "Search",
        url: "/search",
        icon: (<RiSearchLine />),
    },
    {
        title: "My Events",
        url: "/my-events",
        icon: (<RiCalendarEventFill />),
    },
]