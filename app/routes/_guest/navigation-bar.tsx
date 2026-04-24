import { RiCloseLine, RiMenu2Line, RiSearch2Line } from '@remixicon/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function () {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className={`bg-white/50 backdrop-blur-lg sticky top-0 z-50 ${scrolled ? "" : "border-b border-gray-200"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" onClick={closeMenu} className='flex items-center gap-2 z-50'>
                        <img src="/images/logos/app_logo.png" alt="AriaPass Logo" className="h-auto w-10 md:w-12 object-contain" />
                    </Link>

                    {/* Desktop Search (Hidden on small screens) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Search music events, artists..."
                            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-gray-300 rounded-full py-2 pl-10 pr-4 outline-none transition-all text-sm"
                        />
                    </div>

                    {/* Nav Actions (Desktop) */}
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link to={"#"} className="text-gray-600 hover:text-[#f05537] transition-colors">Create an event</Link>
                        <Link to={"find-ticket"} className="text-gray-600 hover:text-[#f05537] transition-colors flex items-center gap-1">
                            Find my tickets
                        </Link>
                        <Link to={"/organisers"} className="text-gray-600 hover:text-[#f05537] transition-colors">
                            Organisers
                        </Link>
                        <Link to={"/register"} className="text-gray-600 hover:text-[#f05537] transition-colors">
                            Register
                        </Link>
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
                    <div className="relative mb-6">
                        <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-[#f05537] rounded-lg py-3 pl-10 pr-4 outline-none transition-all text-sm"
                        />
                    </div>

                    {/* Mobile Links */}
                    <Link
                        to={""}
                        onClick={closeMenu}
                        className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-[#f05537] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Create an event
                    </Link>
                    <Link
                        to={""}
                        onClick={closeMenu}
                        className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-[#f05537] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Find my tickets
                    </Link>
                    <Link
                        to={""}
                        onClick={closeMenu}
                        className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-[#f05537] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Organisers
                    </Link>
                    <Link
                        to={""}
                        onClick={closeMenu}
                        className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-[#f05537] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    )
}
