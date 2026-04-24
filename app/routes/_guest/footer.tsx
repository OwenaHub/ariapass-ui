import { APP_NAME } from "~/config/defaults";

const footerSections = [
    {
        title: `Use ${APP_NAME}`,
        links: [
            { label: "Create Events", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Event Marketing Platform", href: "#" },
            { label: `${APP_NAME} Mobile Ticket App`, href: "#" },
            { label: `${APP_NAME} Check-In App`, href: "#" },
        ],
    },
    {
        title: "Plan Events",
        links: [
            { label: "Sell Tickets Online", href: "#" },
            { label: "Event Planning", href: "#" },
            { label: "Sell Concert Tickets Online", href: "#" },
            { label: "Event Payment System", href: "#" },
        ],
    },
    {
        title: "Find Events",
        links: [
            { label: "New Orleans Food & Drink Events", href: "#" },
            { label: "San Francisco Holiday Events", href: "#" },
            { label: "Lagos Music Festivals", href: "#" },
            { label: "London Concerts", href: "#" },
        ],
    },
    {
        title: "Connect With Us",
        links: [
            { label: "Contact Support", href: "#" },
            { label: "Twitter", href: "#" },
            { label: "Facebook", href: "#" },
            { label: "Instagram", href: "#" },
        ],
    },
];

const bottomLinks = [
    { label: "Help", href: "#" },
    { label: "Security", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
];

export default function RootLayoutFooter() {
    return (
        <footer className="bg-[#1e0a3c] text-white pt-16 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                            <ul className="space-y-3 text-sm text-gray-300">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href={link.href} className="hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Footer Bar */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <div className="mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} <span className="text-white">{APP_NAME}</span>.
                        For music lovers, by music lovers.
                    </div>
                    <div className="flex gap-4">
                        {bottomLinks.map((link, index) => (
                            <a key={index} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}