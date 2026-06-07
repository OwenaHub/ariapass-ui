import {
    RiCloseLine,
    RiMenuLine,
    RiSearch2Line,
    RiUser3Fill,
    RiNotification3Line
} from '@remixicon/react'
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
        { label: 'Organisers', path: '/organisers' },
        { label: 'Discover Events', path: '/events' },
        { label: 'Find my tickets', path: '/tickets' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className={`bg-white/80 backdrop-blur-lg sticky top-0 z-50 ${scrolled ? "" : "border-b border-gray-200"}`}>
            <div className="container py-0">
                <div className="flex justify-between items-center h-16 relative w-full">

                    {/* LEFT: Mobile Menu Toggle & Desktop Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-primary hover:text-[#f05537] focus:outline-none transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <RiCloseLine />
                            ) : (
                                <RiMenuLine />
                            )}
                        </button>

                        <Link to="/" onClick={closeMenu} className='hidden md:flex flex-col items-center z-50'>
                            <img src="/images/logos/app_logo.png" alt="AriaPass Logo" className="h-auto w-30 object-contain" />
                        </Link>
                    </div>

                    {/* CENTER: Mobile Logo (Absolutely positioned for perfect centering) */}
                    <Link to="/" onClick={closeMenu} className='md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50'>
                        <img src="/images/logos/app_logo.png" alt="AriaPass Logo" className="h-auto w-28 object-contain" />
                    </Link>

                    {/* Desktop Search */}
                    <SearchBar
                        containerClass="hidden md:flex flex-1 max-w-md mx-8 relative"
                        inputClass="focus:border-gray-300 rounded-full py-2"
                        placeholder="Search music events, artists..."
                    />

                    {/* RIGHT: Action Icons & Desktop Links */}
                    <div className="flex items-center gap-6 z-50">

                        {/* Nav Actions (Desktop) */}
                        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.path} to={link.path} className="text-gray-600 hover:text-[#f05537] transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Action Icons (Matches Screenshot) */}
                        <div className="flex items-center gap-2">
                            <Link to={user ? "/home" : "/login"} onClick={closeMenu}>
                                <button className="size-9 rounded-full bg-gray-100 hover:bg-slate-100 flex items-center justify-center text-gray-800 transition-colors">
                                    <RiUser3Fill className="size-4" />
                                </button>
                            </Link>
                            <Link to="/tickets" onClick={closeMenu}>
                                <button className="relative size-9 rounded-full bg-gray-100 hover:bg-slate-100 flex items-center justify-center text-gray-800 transition-colors">
                                    <RiNotification3Line className="size-4" />
                                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
                                </button>
                            </Link>
                        </div>
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