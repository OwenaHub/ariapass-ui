import { RiAddLine, RiCoupon2Line, RiFileList3Line } from "@remixicon/react";
import { Link } from "react-router";
import { Text } from "~/components/ui/text";

export default function NavigationSection({ user }: { user: User }) {
    return (
        <section className="flex gap-8 md:gap-10 items-center overflow-x-auto pt-4 pb-8">
            <div className="flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <Link to="#" className="flex items-center justify-center size-16 md:size-20 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <RiFileList3Line className="text-gray-700" size={30} />
                </Link>
                <Text.small className="text-center leading-tight">
                    Event<br />Program
                </Text.small>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <Link to="#" className="flex items-center justify-center size-16 md:size-20 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <RiCoupon2Line className="text-gray-700" size={30} />
                </Link>
                <Text.small className="text-center leading-tight">
                    Find<br />Ticket
                </Text.small>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 group cursor-pointer">
                <Link
                    to={user.organiserProfile ? "/my-events/new" : "/organiser/new"}
                    className="relative flex items-center justify-center size-16 md:size-20 rounded-full transition-transform duration-300"
                >
                    {/* The background glow that fades in on hover */}
                    <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-indigo-500 to-pink-500 blur-md z-0" />

                    {/* The spinning gradient border */}
                    <div className="absolute inset-0 rounded-full animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_10%,#4f46e5_40%,#db2777_70%,transparent_100%)] z-10" />

                    {/* The solid white inner circle that creates the "border" effect */}
                    <div className="absolute inset-0.5 bg-white rounded-full z-20" />

                    {/* The Icon */}
                    <RiAddLine className="relative z-30 text-gray-700 group-hover:text-indigo-600 transition-colors" size={30} />
                </Link>

                <Text.small className="text-center leading-tight group-hover:text-indigo-700 transition-colors">
                    Create<br />Event
                </Text.small>
            </div>

        </section>
    )
}
