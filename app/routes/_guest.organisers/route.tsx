import { useState } from 'react';
import { Link, type MetaFunction } from 'react-router';
import {
    RiCheckboxCircleFill, RiSmartphoneLine, RiGroupLine, RiFlashlightFill,
    RiCheckLine, RiQuestionLine, RiStarFill, RiShieldCheckLine,
    RiEarthLine, RiPaintBrushLine
} from '@remixicon/react';
import { toast } from 'sonner';

import { defaultMeta } from '~/lib/meta';
import HrWithText from '~/components/custom/hr-with-text';
import { BrMd, BrSm } from '~/components/ui/line-break';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export const meta: MetaFunction = () => {
    return [
        ...defaultMeta(),
        { title: "Organisers | AriaPass" },
    ];
}

export default function Organisers() {
    const [isPartner, setIsPartner] = useState(true);

    const tiers = [
        {
            name: "Basic",
            price: "0",
            description: "Perfect for upcoming artists and small community gatherings.",
            icon: <RiFlashlightFill className="w-6 h-6 text-slate-400" />,
            features: [
                "3 Ticket Tiers",
                "24/7 Chat Support",
            ],
            cta: "Start for Free",
            highlight: false
        },
        {
            name: "Standard",
            price: "9,700",
            description: "Designed for growing shows and professional event planners.",
            icon: <RiStarFill className="w-6 h-6 text-amber-500" />,
            features: [
                "5 Collaborators",
                "5 Ticket Tiers",
                "Interactive Digital Program",
                "Audience Graph Insights",
            ],
            cta: "Go Standard",
            highlight: false
        },
        {
            name: "Premium",
            price: "21,500",
            description: "The ultimate power-up for major concerts, festivals and musical events.",
            icon: <RiShieldCheckLine className="w-6 h-6 text-theme" />,
            features: [
                "30 Team Collaborators",
                "Unlimited Ticket Volume",
                "Audience Graph Insights",
                "Priority Phone Support"
            ],
            cta: "Get Premium",
            highlight: true
        },
        {
            name: "Elite",
            price: "85,000",
            description: "Full concierge service with custom asset design for high-impact promotion.",
            icon: <RiPaintBrushLine className="w-6 h-6 text-purple-600" />,
            features: [
                "Everything in Premium Tier",
                "In-House Media Package",
                "1 Master Event Flyer Design",
                "3 Social Format Countdown Assets",
                "Priority Banner Placement"
            ],
            cta: "Go Elite",
            highlight: false
        }
    ];

    return (
        <main className="bg-white min-h-screen font-sans text-slate-900 animated fadeIn">

            {/* Hero Section */}
            <section className="container pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
                <div className="mx-auto text-start relative">

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-indigo-200 text-gray-700 text-xs font-semibold tracking-tighter mb-6">
                        <RiFlashlightFill className="w-3 h-3 text-primary" />
                        <span className="font-bold text-theme">NEW:</span>
                        <span>Interactive Digital Event Programs</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter mb-6">
                        Sell tickets. <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                            Own your audience data.
                        </span>
                    </h1>

                    <div className="hidden lg:block absolute -right-18 -top-10">
                        <img src="/images/banners/conductor.png" alt="" className='w-170 h-auto cursor-none pointer-events-none' />
                    </div>

                    <p className="text-base text-primary max-w-2xl mb-10 leading-relaxed">
                        The music-only ecosystem built for the culture. Seamless ticketing, powerful team collaboration dashboards, and zero paper wastage.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                        <Link to="/register" className="w-full sm:w-auto">
                            <Button className={"w-full md:w-auto"} size={'lg'} variant={"brand"}>
                                Get Started for Free
                            </Button>
                        </Link>
                        <a
                            onClick={() => toast('Organiser guide downloaded', {
                                description: 'Check your downloads folder'
                            })}
                            href="/resources/ariapass-guide.pdf"
                            download="ariapass-organiser-guide.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button className={"w-full md:w-auto"} size={'lg'} variant={"default"}>
                                Download Guide
                            </Button>
                        </a>
                    </div>

                    {/* Abstract Dashboard Visual */}
                    <div className="relative mx-auto max-w-7xl">
                        <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded blur opacity-20"></div>
                        <div className="relative bg-slate-50 border border-slate-200 rounded shadow-2xl overflow-hidden">
                            {/* Fake Browser Header */}
                            <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">JD</div>
                                    <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-600">AS</div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">+5</div>
                                </div>
                            </div>
                            {/* Fake Content */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                <div className="col-span-2 space-y-4">
                                    <div className="h-36 bg-white rounded border border-slate-100 shadow-sm p-4">
                                        <div className="h-4 w-1/3 bg-slate-100 rounded mb-2"></div>
                                        <div className="text-3xl font-bold text-slate-800">₦2,450,000</div>
                                        <div className="text-sm text-green-600 mt-1">Platform Commission: ₦0.00 (Partner Track Active)</div>
                                    </div>
                                    <div className="h-30 bg-white rounded border border-slate-100 shadow-sm"></div>
                                </div>
                                <div className="hidden md:block bg-indigo-50 rounded border border-indigo-100 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <RiSmartphoneLine className="w-4 h-4 text-indigo-600" />
                                        <span className="text-xs font-bold text-indigo-900">Digital Program Live View</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-indigo-200 rounded w-full"></div>
                                        <div className="h-2 bg-indigo-200 rounded w-3/4"></div>
                                        <div className="h-2 bg-indigo-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center mb-6">
                                <RiCheckboxCircleFill className="w-6 h-6 text-green-600" />
                            </div>
                            <Text.h3 className="font-medium mb-3">Keep Your Ticket Sales</Text.h3>
                            <Text.p className="text-slate-600 leading-relaxed tracking-tighter">
                                Opt for our Partner Track for a 0% ticketing fee model that protects your profit margins on pure cultural equity.
                            </Text.p>
                        </div>

                        <div className="bg-white p-8 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center mb-6">
                                <RiGroupLine className="w-6 h-6 text-blue-600" />
                            </div>
                            <Text.h3 className="font-medium mb-3">Granular Collaborations</Text.h3>
                            <Text.p className="text-slate-600 leading-relaxed tracking-tighter">
                                Invite multi-disciplinary event producers, venue gatekeepers, and sponsors to track execution data securely.
                            </Text.p>
                        </div>

                        <div className="bg-white p-8 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center mb-6">
                                <RiSmartphoneLine className="w-6 h-6 text-purple-600" />
                            </div>
                            <Text.h3 className="font-medium mb-3">Interactive Fan Passports</Text.h3>
                            <Text.p className="text-slate-600 leading-relaxed tracking-tighter">
                                Replace wasteful booklets with dynamic QR-accessible setlists, instant social links, and trackable sponsor banners.
                            </Text.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Controls & Split Track Description */}
            <section className="bg-slate-50 pt-10">
                <div className="py-12 px-6 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl text-slate-900 tracking-tighter mb-6 leading-[0.9]">
                        <span className="text-gray-500 tracking-tighter">Predictable Software</span> for <BrSm /> <span className="text-theme">Unforgettable</span> Gigs
                    </h2>
                    <p className="text-sm md:text-lg text-slate-600 mb-10 leading-relaxed">
                        Choose how you interact with our platform infrastructure. Scale your volume seamlessly without predatory fee surprises.
                    </p>

                    <div className="w-full md:max-w-md inline-flex items-center p-1 bg-white border border-slate-200 rounded shadow-sm mb-12">
                        <button
                            onClick={() => setIsPartner(true)}
                            className={`flex-1 px-2 py-3 rounded text-sm font-bold transition-all ${isPartner ? 'bg-theme text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Partner Track (0% Commission)
                        </button>
                        <button
                            onClick={() => setIsPartner(false)}
                            className={`flex-1 px-2 py-3 rounded text-sm font-bold transition-all ${!isPartner ? 'bg-theme text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Independent Track (5% Commission)
                        </button>
                    </div>

                    <div className="max-w-xl mx-auto p-4 bg-indigo-50 rounded border border-indigo-100 flex gap-4 items-center text-left">
                        <div className="bg-white p-2 rounded shadow-sm shrink-0">
                            <RiEarthLine className="w-5 h-5 text-theme" />
                        </div>
                        <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                            {isPartner
                                ? "Enjoy 0% platform commission. To support our infrastructure, AriaPass automated system co-branding watermarks will display elegantly across your Digital Programs and email ticket confirmations."
                                : "Retain 100% white-labeled control of your experience. No AriaPass watermarks or cross-promotional styling. We maintain your system resources with a flat 5% transaction commission fee."}
                        </p>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="container pb-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {tiers.map((tier, idx) => (
                        <article key={idx} className={`relative bg-white rounded p-6 border-2 transition-all hover:-translate-y-2 flex flex-col justify-between ${tier.highlight ? 'border-theme shadow-2xl z-10' : 'border-slate-100 shadow-xl'}`}>
                            <div>
                                {tier.highlight && (
                                    <span className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-50%] bg-theme text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        Most Popular
                                    </span>
                                )}

                                <div className="mb-6">
                                    <div className="mb-4">{tier.icon}</div>
                                    <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                                    <p className="text-slate-500 text-xs leading-relaxed min-h-10">{tier.description}</p>
                                </div>

                                <div className="mb-6 flex items-baseline gap-1">
                                    <span className="text-3xl font-black">₦{tier.price}</span>
                                    <span className="text-slate-400 font-bold text-xs">/ event</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                                            <RiCheckLine className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" strokeWidth={3} />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to="/register" className="w-full">
                                <Button className="w-full text-xs font-bold" variant={tier.highlight ? "brand" : "default"}>
                                    {tier.cta}
                                </Button>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            {/* Highlights Section */}
            <section className="pb-24 pt-12 container px-4 mx-auto">
                <div className="bg-theme rounded p-10 md:p-16 relative overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-24" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none mb-6">
                                Built to feed <br /> the music economy.
                            </h2>
                            <p className="text-indigo-100 text-base font-medium mb-10">
                                AriaPass does not sell conferences, trade workshops, or generic corporate listings. We curate pure music environments. Your dashboards link live ticket buyers to our expanding target music audience segments.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="mailto:hello@ariapass.africa" className="bg-white text-theme px-8 py-4 rounded font-black text-base shadow-xl shadow-indigo-900/20 active:scale-95 transition-all text-center">
                                    Contact Support
                                </a>
                                <Link to="/my-events/new" className="bg-indigo-500 text-white text-center px-8 py-4 rounded font-black text-base border border-indigo-400 hover:bg-indigo-400 transition-all">
                                    Quick Launch
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-end">
                            <div className="p-8 bg-white/10 backdrop-blur-md rounded border border-white/20">
                                <div className="space-y-4">
                                    {[
                                        "Instant Paystack Native Payouts",
                                        "Interactive Program QR Generations",
                                        "Granular Audience Graph Analytics",
                                        "Offline-Resilient Ticket Scanners"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 text-white text-sm font-bold">
                                            <RiShieldCheckLine className="text-indigo-300 w-5 h-5" /> {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 md:px-6 pb-24" id="feature-matrix">
                <h2 className="text-3xl md:text-4xl text-center mb-8 md:mb-12 text-primary tracking-tight">
                    Feature Matrix
                </h2>

                {/* Wrapper enables horizontal scrolling on small screens */}
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-x-auto no-scrollbar relative">
                    {/* min-w-[600px] ensures the table doesn't crush itself on narrow screens, forcing the scroll */}
                    <table className="w-full text-left border-collapse min-w-150 md:min-w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {/* Sticky First Column */}
                                <th className="sticky left-0 z-10 bg-slate-50 p-4 md:p-5 text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400 border-r border-slate-100 md:border-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                    Feature Capabilities
                                </th>
                                {/* Center-aligned headers for better matrix aesthetics */}
                                <th className="p-4 md:p-5 text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-500 text-center">Basic</th>
                                <th className="p-4 md:p-5 text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-700 text-center">Standard</th>
                                <th className="p-4 md:p-5 text-[10px] md:text-xs font-black uppercase tracking-wider text-theme text-center">Premium</th>
                                <th className="p-4 md:p-5 text-[10px] md:text-xs font-black uppercase tracking-wider text-purple-600 text-center">Elite</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[11px] md:text-xs">

                            {/* Row 1: Tiers */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="sticky left-0 z-10 bg-white p-4 md:p-5 font-bold text-slate-700 whitespace-nowrap md:whitespace-normal border-r border-slate-100 md:border-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                    Total Ticket Tiers
                                </td>
                                <td className="p-4 md:p-5 text-slate-600 text-center font-medium">
                                    <span className="md:hidden">3</span>
                                    <span className="hidden md:inline">3 Tiers</span>
                                </td>
                                <td className="p-4 md:p-5 text-slate-600 text-center font-medium">
                                    <span className="md:hidden">5</span>
                                    <span className="hidden md:inline">5 Tiers</span>
                                </td>
                                <td className="p-4 md:p-5 text-slate-900 text-center font-bold">
                                    <span className="md:hidden">8</span>
                                    <span className="hidden md:inline">8 Tiers</span>
                                </td>
                                <td className="p-4 md:p-5 text-slate-900 text-center font-bold">
                                    <span className="md:hidden">10</span>
                                    <span className="hidden md:inline">10 Tiers</span>
                                </td>
                            </tr>

                            {/* Row 2: Collaboration */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="sticky left-0 z-10 bg-white p-4 md:p-5 font-bold text-slate-700 whitespace-nowrap md:whitespace-normal border-r border-slate-100 md:border-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                    Team Collaboration
                                </td>
                                <td className="p-4 md:p-5 text-slate-600 text-center font-medium">
                                    <span className="md:hidden">1</span>
                                    <span className="hidden md:inline">1 Seat (Owner)</span>
                                </td>
                                <td className="p-4 md:p-5 text-slate-600 text-center font-medium">
                                    <span className="md:hidden">5</span>
                                    <span className="hidden md:inline">Up to 5 Seats</span>
                                </td>
                                <td className="p-4 md:p-5 text-slate-900 text-center font-bold">
                                    <span className="md:hidden">15</span>
                                    <span className="hidden md:inline">Up to 15 Seats</span>
                                </td>
                                <td className="p-4 md:p-5 text-slate-900 text-center font-bold">
                                    <span className="md:hidden">30</span>
                                    <span className="hidden md:inline">30 Seats</span>
                                </td>
                            </tr>

                            {/* Row 3: Digital Program */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="sticky left-0 z-10 bg-white p-4 md:p-5 font-bold text-slate-700 whitespace-nowrap md:whitespace-normal border-r border-slate-100 md:border-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                    Digital Program
                                </td>
                                <td className="p-4 md:p-5 text-slate-300 text-center">—</td>
                                <td className="p-4 md:p-5 text-center">
                                    <RiCheckLine className="w-5 h-5 text-emerald-500 mx-auto" />
                                </td>
                                <td className="p-4 md:p-5 text-center">
                                    <RiCheckLine className="w-5 h-5 text-emerald-500 mx-auto" />
                                </td>
                                <td className="p-4 md:p-5 text-center">
                                    <RiCheckLine className="w-5 h-5 text-emerald-500 mx-auto" />
                                </td>
                            </tr>

                            {/* Row 4: Graph Segment */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="sticky left-0 z-10 bg-white p-4 md:p-5 font-bold text-slate-700 whitespace-nowrap md:whitespace-normal border-r border-slate-100 md:border-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                    Audience Graph Export
                                </td>
                                <td className="p-4 md:p-5 text-slate-300 text-center">—</td>
                                <td className="p-4 md:p-5 text-slate-300 text-center">—</td>
                                <td className="p-4 md:p-5 text-center">
                                    <RiCheckLine className="w-5 h-5 text-emerald-500 mx-auto" />
                                </td>
                                <td className="p-4 md:p-5 text-center">
                                    <RiCheckLine className="w-5 h-5 text-emerald-500 mx-auto" />
                                </td>
                            </tr>

                            {/* Row 5: Media Package */}
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="sticky left-0 z-10 bg-white p-4 md:p-5 font-bold text-slate-700 whitespace-nowrap md:whitespace-normal border-r border-slate-100 md:border-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">
                                    In-House Media Package
                                </td>
                                <td className="p-4 md:p-5 text-slate-300 text-center">—</td>
                                <td className="p-4 md:p-5 text-slate-300 text-center">—</td>
                                <td className="p-4 md:p-5 text-slate-300 text-center">—</td>
                                <td className="p-4 md:p-5 text-center flex flex-col items-center justify-center">
                                    <RiCheckLine className="w-5 h-5 text-purple-600 mb-1" />
                                    <span className="hidden md:block text-[10px] text-purple-600 font-bold whitespace-nowrap">
                                        1 Flyer + 3 Revisions
                                    </span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl text-center mb-16">
                        Frequently <BrSm />Asked Questions
                    </h2>
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-lg mb-3 flex items-center gap-2">
                                <RiQuestionLine className="w-5 h-5 text-theme" />
                                How does the Partner Track 0% work?
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                When you agree to promote our platform at your event, we waive the standard 5% platform payment commission. Be default you enjoy a fully custom, white-labeled experience.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg mb-3 flex items-center gap-2">
                                <RiQuestionLine className="w-5 h-5 text-theme" />
                                Are free event tickets capped?
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                No. Completely free events (where ticket prices are set to ₦0 for your fans) feature completely unlimited transaction counts across every tier. We only calculate volume barriers for events handling paid, revenue-generating inventory on the Basic and Standard plans.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg mb-3 flex items-center gap-2">
                                <RiQuestionLine className="w-5 h-5 text-theme" />
                                How does the Elite Tier Media package deliver?
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Once an event upgrades to the Elite tier, an in-house AriaPass design specialist connects with your designated event collaborator. We produce a professional high-conversion master event flyer and scale variant configurations matching standard social dimensions within 48 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Footer CTA */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl mb-6 tracking-tighter">
                        Ready to scale your<BrMd />live music experiences?
                    </h2>
                    <p className="text-slate-600 mb-8 text-sm">Join alternative creators and event producers building reliable infrastructure with AriaPass.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to={'/register'} className='w-full sm:w-auto'>
                            <button className="w-full px-8 py-4 bg-primary hover:bg-slate-800 text-white font-semibold rounded-full text-sm transition-colors">
                                Create Account
                            </button>
                        </Link>
                        <div className="hidden sm:block">
                            <HrWithText text="or" />
                        </div>
                        <Link to={'/events'} className='w-full sm:w-auto'>
                            <button className="w-full px-12 tracking-tight py-4 bg-gray-100 hover:bg-gray-200 text-primary font-semibold rounded-full text-sm transition-colors">
                                See Live Events
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}