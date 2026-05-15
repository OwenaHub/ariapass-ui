import { RiCloseLine, RiMenu2Line, RiSearch2Line } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const SearchBar = ({ containerClass, inputClass, placeholder }: { containerClass: string, inputClass: string, placeholder: string }) => (
    <div className={containerClass}>
        <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        <input
            type="text"
            placeholder={placeholder}
            className={`w-full bg-gray-100 border border-transparent outline-none transition-all text-sm pl-10 pr-4 focus:bg-white ${inputClass}`}
        />
    </div>
);

export default function Navbar({ user }: { user?: User }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    const NAV_LINKS = [
        { label: 'Create an event', path: '/events/new' },
        { label: 'Find my tickets', path: '/tickets' },
        { label: 'Organisers', path: '/organisers' },
    ];

    if (user) {
        NAV_LINKS.push(
            { label: 'Home', path: '/home' }
        )
    } else {
        NAV_LINKS.push(
            { label: 'Register', path: '/register' }
        )
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className={`bg-white/80 backdrop-blur-lg sticky top-0 z-50 ${scrolled ? "" : "border-b border-gray-200"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" onClick={closeMenu} className='flex items-center gap-2 z-50'>
                        <img src="/images/logos/app_logo.png" alt="AriaPass Logo" className="h-auto w-10 md:w-12 object-contain" />
                    </Link>

                    {/* Desktop Search */}
                    <SearchBar
                        containerClass="hidden md:flex flex-1 max-w-md mx-8 relative"
                        inputClass="focus:border-gray-300 rounded-full py-2"
                        placeholder="Search music events, artists..."
                    />

                    {/* Nav Actions (Desktop) */}
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.path} to={link.path} className="text-gray-600 hover:text-[#f05537] transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu toggle button */}
                    <div className="md:hidden flex items-center z-50">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 -mr-2 text-gray-600 hover:text-[#f05537] focus:outline-none transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <RiCloseLine className="w-6 h-6" />
                            ) : (
                                <RiMenu2Line className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div
                className={`md:hidden absolute w-full bg-white backdrop-blur-lg border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
            >
                <div className="px-4 pt-4 pb-6 space-y-2">
                    {/* Mobile Search Bar */}
                    <SearchBar
                        containerClass="relative mb-6"
                        inputClass="focus:border-[#f05537] rounded-lg py-3"
                        placeholder="Search events..."
                    />

                    {/* Mobile Links */}
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={closeMenu}
                            className="block px-3 py-3 text-sm text-gray-800 hover:text-[#f05537] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}