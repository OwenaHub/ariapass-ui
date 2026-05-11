import React from 'react'
import { NavLink, useLocation } from 'react-router'
import { APP_MENU } from './app-menu'
import { RiSquareLine } from '@remixicon/react'

export default function MobileNav() {
    const location = useLocation();
    const pathLength = location.pathname.split('/').slice(1);

    return (
        // 1. Docked to the bottom, full width, with a subtle top border/shadow
        // pb-[env(safe-area-inset-bottom)] is crucial so modern iPhone/Android swipe bars don't cover your icons!
        <>
            {pathLength.length < 2 && (
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-white border-t border-slate-200 shadow-[0_-4px_50px_-1px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">

                    {/* 2. justify-around and flex-1 on children ensures perfectly even spacing */}
                    <section className="flex items-center justify-between h-16">
                        {APP_MENU.map((menu, index) => (
                            <NavLink
                                key={index + menu.url}
                                to={menu.url}
                                // flex-1 makes sure every tab has an equally sized tap target
                                className="flex flex-col items-center justify-center flex-1 h-full gap-1 outline-none tap-highlight-transparent"
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* 3. Icon Wrapper: Active state adds a soft background pill (like modern Android/WhatsApp) */}
                                        <div
                                            className={`flex items-center justify-center rounded transition-all duration-200
                                        ${isActive
                                                    ? 'text-theme' // Active: Colored pill and icon
                                                    : 'text-slate-500 bg-transparent hover:text-slate-800' // Inactive
                                                }`}
                                        >
                                            {menu.icon ? (
                                                React.cloneElement(menu.icon as React.ReactElement<{ className?: string }>, {
                                                    className: 'w-6 h-6 fill-current'
                                                })
                                            ) : (
                                                <RiSquareLine className="w-6 h-6" />
                                            )}
                                        </div>

                                        {/* 4. Text Label: Always visible, tiny, stacked underneath */}
                                        <span
                                            className={`text-xs font-semibold capitalize transition-colors duration-200
                                        ${isActive ? 'text-theme' : 'text-slate-500'}
                                    `}
                                        >
                                            {menu.title}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </section>
                </nav>
            )}
        </>
    )
}