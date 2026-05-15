import { RiCalendarEventFill, RiHomeSmile2Line, RiMusic2Line,RiSparklingFill } from "@remixicon/react";

export const APP_MENU = [
    {
        title: "Home",
        url: "/home",
        icon: (<RiHomeSmile2Line />),
        isActive: true,
    },
    {
        title: "Favourites",
        url: "/favourites",
        icon: (<RiSparklingFill />),
    },
    {
        title: "Tickets",
        url: "/tickets",
        icon: (<RiMusic2Line />),
    },
    {
        title: "My Events",
        url: "/my-events",
        icon: (<RiCalendarEventFill />),
    },
]