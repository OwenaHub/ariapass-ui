import { useState } from 'react';
import { Link, type MetaFunction } from 'react-router';
import {
    RiCheckboxCircleFill, RiSmartphoneLine, RiGroupLine, RiFlashlightFill,
    RiCheckLine, RiQuestionLine, RiStarFill, RiShieldCheckLine,
    RiEarthLine, RiArrowRightLine
} from '@remixicon/react';
import { toast } from 'sonner';

import { defaultMeta } from '~/lib/meta';
import HrWithText from '~/components/custom/hr-with-text';
import { BrSm } from '~/components/ui/line-break';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
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
            features: ["1 Collaborator (You)", "5 Ticket Tiers", "Digital Ticket Delivery", "24/7 Chat Support"],
            cta: "Start for Free",
            highlight: false
        },
        {
            name: "Standard",
            price: "9,700",
            description: "Designed for growing shows and professional event planners.",
            icon: <RiStarFill className="w-6 h-6 text-amber-500" />,
            features: ["5 Collaborators", "5 Ticket Tiers", "Digital Event Program", "Verified Event Reviews", "Historical Analytics"],
            cta: "Go Standard",
            highlight: true
        },
        {
            name: "Premium",
            price: "21,500",
            description: "The ultimate power-up for major concerts, festivals and musical events.",
            icon: <RiShieldCheckLine className="w-6 h-6 text-theme" />,
            features: ["30 Collaborators", "Unlimited Ticket Tiers", "Social Media Promotion (5 posts)", "Priority Phone Support", "Custom Branding"],
            cta: "Get Premium",
            highlight: false
        }
    ];

    return (
        <main className="bg-white min-h-screen font-sans text-slate-900 animated fadeIn">

            <section className="container pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
                <div className="mx-auto text-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-tighter mb-6">
                        <RiFlashlightFill className="w-3 h-3 text-pink-500" /> <span className="font-bold text-pink-500">NEW:</span> <span>Digital Event Programs</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
                        Sell tickets. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                            Keep 100% of the profit.
                        </span>
                    </h1>

                    <p className="text-lg text-primary max-w-2xl mb-10 leading-relaxed">
                        The only event platform that combines <strong>0% commission ticketing</strong> with real-time team collaboration and immersive digital programs.
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
                                    {/* Team Collaboration Visual Hint */}
                                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">JD</div>
                                    <div className="w-8 h-8 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-xs font-bold text-pink-600">AS</div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">+3</div>
                                </div>
                            </div>
                            {/* Fake Content */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                <div className="col-span-2 space-y-4">
                                    <div className="h-36 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                                        <div className="h-4 w-1/3 bg-slate-100 rounded mb-2"></div>
                                        <div className="text-3xl font-bold text-slate-800">$12,450</div>
                                        <div className="text-sm text-green-600 mt-1">Commission Fees: $0.00</div>
                                    </div>
                                    <div className="h-30 bg-white rounded-xl border border-slate-100 shadow-sm"></div>
                                </div>
                                <div className="hidden md:block bg-indigo-50 rounded-xl border border-indigo-100 p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <RiSmartphoneLine className="w-4 h-4 text-indigo-600" />
                                        <span className="text-xs font-bold text-indigo-900">Digital Program</span>
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

            {/* 2. Feature Grid */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                <RiCheckboxCircleFill className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tighter mb-3">Zero Commission Fees</h3>
                            <p className="text-slate-600 leading-relaxed tracking-tighter">
                                Why pay for your own success? We don't take a cut of your ticket sales. You keep every penny you earn, instantly.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <RiGroupLine className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tighter mb-3">Team Collaboration</h3>
                            <p className="text-slate-600 leading-relaxed tracking-tighter">
                                Don't run the show alone. Invite your team to the dashboard, assign roles, and manage attendees together in real-time.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <RiSmartphoneLine className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tighter mb-3">Digital Programs</h3>
                            <p className="text-slate-600 leading-relaxed tracking-tighter">
                                Ditch the paper. Create interactive digital brochures and schedules that attendees can access directly from their phones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Pricing & Partnership Section */}
            <section className="bg-slate-50 pt-10">
                <div className="py-12 px-6 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.9]">
                        <span className="text-gray-500 tracking-tighter">Simple Tools</span> for <BrSm /> <span className="text-theme">Extraordinary</span> Events
                    </h2>
                    <p className="text-sm md:text-lg text-slate-600 mb-10 leading-relaxed">
                        Whether you're hosting an intimate lounge session in Lagos or a stadium concert in Nairobi,
                        our platform scales with you. No hidden fees. Just pure value.
                    </p>

                    <div className="w-full md:max-w-md inline-flex items-center p-1 bg-white border border-slate-200 rounded shadow-sm mb-12">
                        <button
                            onClick={() => setIsPartner(true)}
                            className={`flex-1 px-2 py-3 rounded text-sm font-bold transition-all ${isPartner ? 'bg-theme text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Partner <BrSm /> (0% Fee)
                        </button>
                        <button
                            onClick={() => setIsPartner(false)}
                            className={`flex-1 px-2 py-3 rounded text-sm font-bold transition-all ${!isPartner ? 'bg-theme text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            Independent <BrSm /> (5% Fee)
                        </button>
                    </div>

                    <div className="max-w-xl mx-auto p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-4 items-center text-left">
                        <div className="bg-white p-2 rounded-lg shadow-sm shrink-0">
                            <RiEarthLine className="w-5 h-5 text-theme" />
                        </div>
                        <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                            {isPartner
                                ? "Partnering with us means 0% platform commission in exchange for on-site sponsorship (shoutouts/flyer logo)."
                                : "Keep your event strictly your own brand. We take a small 5% fee to maintain the infrastructure."}
                        </p>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="container pb-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {tiers.map((tier, idx) => (
                        <article key={idx} className={`relative bg-white rounded p-8 border-2 transition-all hover:-translate-y-2 ${tier.highlight ? 'border-theme shadow-2xl z-10' : 'border-slate-100 shadow-xl'}`}>
                            {tier.highlight && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-50%] bg-theme text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Most Popular
                                </span>
                            )}

                            <div className="mb-8">
                                <div className="mb-4">{tier.icon}</div>
                                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                                <p className="text-slate-500 text-sm leading-relaxed">{tier.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-black">₦{tier.price}</span>
                                <span className="text-slate-400 font-bold text-sm">/ event</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {tier.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                        <RiCheckLine className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={3} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                <div className='mx-auto max-w-md pb-24 px-4'>
                    <Link to={"/my-events/new"} className="w-full py-4 rounded font-bold transition-all flex items-center justify-center gap-2 bg-theme text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                        Get started
                        <RiArrowRightLine className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* 4. Highlight Banner CTA */}
            <section className="pb-24 pt-12 container px-4 mx-auto">
                <div className="bg-theme rounded p-10 md:p-20 relative overflow-hidden text-center md:text-left">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 -skew-x-12 translate-x-24" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                                Keep 100% of <br /> your gate.
                            </h2>
                            <p className="text-indigo-100 text-lg font-medium mb-10">
                                AriaPass is built for the culture. We want to sponsor your event.
                                We don't take your profit, we just help you fill the seats as you keep 100% of your ticket sales.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4">
                                <a href="mailto:hello@ariapass.africa" className="bg-white text-theme px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-900/20 active:scale-95 transition-all text-center">
                                    Contact Us
                                </a>
                                <Link to="/my-events/new" className="bg-indigo-500 text-white text-center px-10 py-5 rounded-2xl font-black text-lg border border-indigo-400 hover:bg-indigo-400 transition-all">
                                    Create Event
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-end">
                            <div className="p-8 bg-white/10 backdrop-blur-md rounded border border-white/20">
                                <div className="space-y-4">
                                    {[
                                        "Instant Paystack Payouts",
                                        "Digital Program Access",
                                        "Audience Insights Dashboard",
                                        "Priority Support"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 text-white font-bold">
                                            <RiShieldCheckLine className="text-indigo-300 w-5 h-5" /> {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Comparison Table */}
            <section className="max-w-5xl mx-auto px-6 pb-24 hidden md:block">
                <h2 className="text-3xl font-black text-center mb-12 text-slate-900">Compare Features</h2>
                <div className="bg-white rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-6 text-sm font-black uppercase tracking-wider text-slate-400">Feature</th>
                                <th className="p-6 text-sm font-black uppercase tracking-wider text-slate-900">Basic</th>
                                <th className="p-6 text-sm font-black uppercase tracking-wider text-theme">Standard</th>
                                <th className="p-6 text-sm font-black uppercase tracking-wider text-purple-600">Premium</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <tr>
                                <td className="p-6 text-sm font-bold text-slate-700">Ticket Tiers</td>
                                <td className="p-6 text-sm">5 tickets</td>
                                <td className="p-6 text-sm">5 tickets</td>
                                <td className="p-6 text-sm">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-sm font-bold text-slate-700">Collaborators</td>
                                <td className="p-6 text-sm">1 (Just you)</td>
                                <td className="p-6 text-sm">Up to 5</td>
                                <td className="p-6 text-sm">Up to 30</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-sm font-bold text-slate-700">Social Promotion</td>
                                <td className="p-6 text-sm text-slate-300">—</td>
                                <td className="p-6 text-sm">2 Posts</td>
                                <td className="p-6 text-sm">5 Posts + Newsletter</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-sm font-bold text-slate-700">Digital Program</td>
                                <td className="p-6 text-sm text-slate-300">—</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-sm font-bold text-slate-700">Event Reviews</td>
                                <td className="p-6 text-sm text-slate-300">—</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                            </tr>
                            <tr>
                                <td className="p-6 text-sm font-bold text-slate-700">Event QR Code</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                                <td className="p-6 text-sm font-bold text-emerald-600">Included</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-center mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <RiQuestionLine className="w-5 h-5 text-theme" />
                                How does the 0% commission work?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                If you choose the Partner track, we waive our 5% platform fee. In return, we ask for
                                a shoutout from the MC and our logo on your event flyers. It's a barter that helps
                                both of us grow!
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <RiQuestionLine className="w-5 h-5 text-theme" />
                                When do I receive my ticket payouts?
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Standard payouts occur immediately your fans make purchase using your link.
                                Payments made in the weekends (Friday 5pm GMT - Sunday 11pm GMT) will be processed on Monday morning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Final Footer CTA */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter">Ready to launch your next event?</h2>
                    <p className="text-slate-600 mb-8">Join our community of organizers saving money and working smarter.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to={'/register'} className='w-full sm:w-auto'>
                            <button className="w-full px-8 py-4 bg-primary hover:bg-slate-800 text-white font-semibold rounded-full text-base transition-colors">
                                Get Started for Free
                            </button>
                        </Link>
                        <div className="hidden sm:block">
                            <HrWithText text="or" />
                        </div>
                        <Link to={'/events'} className='w-full sm:w-auto'>
                            <button className="w-full px-12 tracking-tight py-4 bg-gray-100 hover:bg-gray-200 text-primary font-semibold rounded-full text-base transition-colors">
                                See Events
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}