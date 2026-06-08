import { APP_NAME } from "~/config/defaults";
import { Link } from "react-router";
import {
    RiWhatsappFill,
    RiFacebookCircleFill,
} from "@remixicon/react";

const footerSections = [
    {
        title: "Useful Links",
        links: [
            { label: "Discover Events", href: "/events" },
            { label: "Create an Event", href: "/my-events/new" },
            { label: "For Organisers", href: "/organisers" },
            { label: "Help Center", href: "/help" },
        ],
    },
    {
        title: "Connect",
        links: [
            {
                label: "WhatsApp Channel",
                href: "https://whatsapp.com/channel/0029VbBWkeGGU3BImZoq6R0k",
                icon: <RiWhatsappFill className="w-4 h-4" />
            },
            {
                label: "Facebook",
                href: "https://www.facebook.com/share/1JkgbCUTYS/",
                icon: <RiFacebookCircleFill className="w-4 h-4" />
            },
        ],
    },
];

const bottomLinks = [
    { label: "Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-use" },
    { label: "Privacy", href: "/privacy-policy" },
];

export default function RootLayoutFooter() {
    return (
        <footer className="bg-slate-900 text-white overflow-hidden relative pt-16 pb-8 mt-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#625df5]/10 blur-3xl rounded-full translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Brand / Logo Section */}
                    <div className="col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4 w-max">
                            <div className="bg-white rounded-full">
                                <img src="/images/logos/alt_logo.png" alt="AriaPass Logo" className="h-auto w-7 object-contain" />
                            </div>
                            <span className="text-lg font-bold tracking-tighter">
                                {APP_NAME}
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xs">
                            Promoting live music performance, and providing useful tools for event organisers
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
                        {footerSections.map((section, index) => (
                            <div key={index}>
                                <h4 className="font-bold tracking-tight text-white mb-5">{section.title}</h4>
                                <ul className="space-y-4 text-sm text-slate-400 font-light">
                                    {section.links.map((link: any, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                {link.icon && link.icon}
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-light gap-4">
                    <div>
                        &copy; {new Date().getFullYear()} <span className="font-medium text-slate-300">{APP_NAME}</span>. For music lovers, by music lovers.
                    </div>
                    <div className="flex gap-6">
                        {bottomLinks.map((link, index) => (
                            <a key={index} href={link.href} className="hover:text-slate-300 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}