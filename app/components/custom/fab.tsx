import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
    RiWhatsappLine,
    RiCustomerService2Line,
    RiTicket2Line,
    RiPhoneLine,
    RiMenu5Line
} from "@remixicon/react";

export default function FAB() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const fabRef = useRef<HTMLDivElement>(null);

    // Close the FAB if the user clicks anywhere outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Detect scrolling to make the FAB transparent
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            // Only become transparent if the menu isn't actively open
            if (!isOpen) {
                setIsScrolling(true);
                clearTimeout(timeoutId);
                // Return to solid 500ms after the user stops scrolling
                timeoutId = setTimeout(() => setIsScrolling(false), 10000);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, [isOpen]);

    const actions = [
        {
            label: "My Tickets",
            icon: <RiTicket2Line size={18} />,
            href: "/tickets",
            isExternal: false,
            color: "bg-blue-500 hover:bg-blue-600 text-white"
        },
        {
            label: "Email Support",
            icon: <RiCustomerService2Line size={18} />,
            href: "mailto:hello@ariapass.africa",
            isExternal: true,
            color: "bg-theme hover:bg-theme/90 text-white"
        },
        {
            label: "Call Support",
            icon: <RiPhoneLine size={18} />,
            href: "tel:+2348026658956",
            isExternal: true,
            color: "bg-orange-500 hover:bg-orange-600 text-white"
        },
        {
            label: "WhatsApp",
            icon: <RiWhatsappLine size={18} />,
            href: "https://whatsapp.com/channel/0029VbBWkeGGU3BImZoq6R0k",
            isExternal: true,
            color: "bg-emerald-500 hover:bg-emerald-600 text-white"
        }
    ];

    return (
        <div
            ref={fabRef}
            // Added pointer-events-none to the wrapper so it doesn't block clicks
            className={`fixed z-50 flex flex-col items-end md:items-center transition-all duration-500 bottom-22 right-6 md:bottom-8 md:left-1/2 md:right-auto md:-translate-x-1/2 hover:opacity-100 pointer-events-none ${isScrolling && !isOpen ? "opacity-20" : "opacity-100"
                }`}
        >
            {/* The Action Items Container */}
            <div
                className={`mb-4 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 translate-y-10 pointer-events-none scale-90"
                    } flex flex-col md:grid md:grid-cols-2 gap-2.5`}
            >
                {actions.map((action, index) => {
                    const delay = isOpen ? `${(actions.length - index) * 40}ms` : '0ms';

                    const ActionContent = (
                        <div
                            className="flex items-center gap-3 bg-gray-200/50 border backdrop-blur-sm p-1.5 pr-4 rounded-full transition-all hover:scale-105 hover:shadow-xl w-50 md:w-40 cursor-pointer"
                            style={{ transitionDelay: delay }}
                        >
                            <div className={`flex shrink-0 items-center justify-center w-9 h-9 rounded-full shadow-inner ${action.color}`}>
                                {action.icon}
                            </div>
                            <span className="text-[11px] md:text-xs font-bold text-gray-800 tracking-tight whitespace-nowrap">
                                {action.label}
                            </span>
                        </div>
                    );

                    return action.isExternal ? (
                        <a
                            key={action.label}
                            href={action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="focus:outline-none"
                        >
                            {ActionContent}
                        </a>
                    ) : (
                        <Link
                            key={action.label}
                            to={action.href}
                            onClick={() => setIsOpen(false)}
                            className="focus:outline-none"
                        >
                            {ActionContent}
                        </Link>
                    );
                })}
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                // Added pointer-events-auto here so the button remains clickable
                className="pointer-events-auto relative flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-800 hover:scale-105 transition-transform duration-300 focus:outline-none"
            >
                <RiMenu5Line
                    size={28}
                    className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
                />
            </button>
        </div>
    );
}