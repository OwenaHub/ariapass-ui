import {
    RiTicketLine,
    RiMic2Line,
    RiQuestionAnswerLine,
    RiMailSendLine,
    RiCheckLine,
    RiSmartphoneLine,
    RiHeartLine,
    RiTeamLine,
    RiMoneyDollarCircleLine,
    RiArrowRightLine
} from '@remixicon/react';

export default function HelpCenter() {
    const faqs = [
        {
            category: "General",
            questions: [
                {
                    q: "I forgot my password. How do I reset it?",
                    a: "Go to the Login page and click 'Forgot Password.' Enter your registered email address, and we will send you a secure link to reset your password."
                },
                {
                    q: "Is my payment information secure?",
                    a: "Absolutely. AriaPass does not store your credit card details. All transactions are securely encrypted and processed through industry-leading payment providers."
                }
            ]
        },
        {
            category: "Attendees",
            questions: [
                {
                    q: "I bought a ticket but didn't receive an email. What should I do?",
                    a: "First, check your spam or promotions folder. If you still can't find it, log in to your AriaPass account and go to the My Tickets tab. Your ticket and QR code will always be accessible there."
                },
                {
                    q: "Can I get a refund if I can't attend the concert?",
                    a: "Refund policies are set by the individual event organizers, not by AriaPass. Please check the specific event page for the organizer's refund policy. If refunds are permitted, you can request one via the 'Contact Organizer' button on your ticket."
                },
                {
                    q: "Can I transfer my ticket to a friend?",
                    a: "Yes. If the organizer allows ticket transfers, you will see a 'Transfer Ticket' option next to your digital ticket. Enter your friend's email, and the QR code will be regenerated and sent to them."
                }
            ]
        },
        {
            category: "Organizers",
            questions: [
                {
                    q: "How does the 0% commission 'Partner' track work?",
                    a: "If you select the Partner track, we completely waive our standard 5% platform fee. In exchange, we ask for a barter: include the AriaPass logo on your promotional flyers and have your MC give us a brief shoutout during the event. You keep 100% of your ticket sales."
                },
                {
                    q: "When do I receive my payouts?",
                    a: "Standard payouts occur immediately as fans purchase tickets via your link. Note: Payments made over the weekend (Friday 5 PM GMT - Sunday 11 PM GMT) are typically processed and settled to your bank account on Monday morning."
                },
                {
                    q: "How do I scan tickets at the venue?",
                    a: "Log in to your AriaPass Organizer account on any smartphone and navigate to your event dashboard. Click 'Scan Tickets' to open the built-in QR scanner. You and your invited collaborators can scan attendees in simultaneously from multiple devices."
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 selection:bg-[#625df5]/20 selection:text-[#625df5]">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 pt-20 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
                        AriaPass <span className="text-[#625df5]">Help Center</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-light leading-relaxed">
                        Whether you are a fan looking for your next unforgettable concert or an organizer planning a massive festival, we have you covered. Browse our comprehensive guides and FAQs below.
                    </p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 mt-12 space-y-16">

                {/* For Attendees Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#625df5]/10 flex items-center justify-center rounded">
                            <RiTicketLine className="text-[#625df5] w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">For Attendees</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 border border-slate-200 rounded shadow-sm">
                            <RiSmartphoneLine className="w-6 h-6 text-slate-400 mb-4" />
                            <h3 className="text-lg font-bold mb-2">Getting Your Tickets</h3>
                            <ul className="space-y-3 text-sm text-slate-600 font-light">
                                <li><strong className="font-semibold text-slate-900">Purchasing:</strong> Browse the timeline, select your concert, and pay securely via integrated gateways like Paystack.</li>
                                <li><strong className="font-semibold text-slate-900">Digital Delivery:</strong> AriaPass is paperless. Your ticket and QR code are saved directly to your account.</li>
                                <li><strong className="font-semibold text-slate-900">Accessing:</strong> Open the app or website at the gate and present your QR code for scanning.</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 border border-slate-200 rounded shadow-sm flex flex-col gap-6">
                            <div>
                                <RiSmartphoneLine className="w-6 h-6 text-slate-400 mb-4" />
                                <h3 className="text-lg font-bold mb-2">Digital Programs</h3>
                                <p className="text-sm text-slate-600 font-light leading-relaxed">
                                    Access event schedules, artist bios, and exclusive content directly from your phone. Links are available on your ticket page 24 hours before the show.
                                </p>
                            </div>
                            <div className="pt-6 border-t border-slate-100">
                                <RiHeartLine className="w-6 h-6 text-slate-400 mb-4" />
                                <h3 className="text-lg font-bold mb-2">Saving & Reviews</h3>
                                <p className="text-sm text-slate-600 font-light leading-relaxed">
                                    Not ready to buy? Save events for later. After the show, leave public, private, or anonymous reviews.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* For Organizers Section */}
                <section>
                    <div className="flex items-center gap-3 my-6">
                        <div className="w-10 h-10 bg-[#625df5]/10 flex items-center justify-center rounded">
                            <RiMic2Line className="text-[#625df5] w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">For Organizers</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 border border-slate-200 rounded shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Setting Up Your Event</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Navigate to Dashboard and click New Event.",
                                    "Fill in details: title, description, date, and time.",
                                    "Upload a high-quality banner (e.g., 1920x1080).",
                                    "Set up your ticket tiers (Regular, VIP, etc.).",
                                    "Publish your event to the AriaPass timeline."
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm text-slate-600 font-light">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-5">
                            <div className="bg-white p-6 border border-slate-200 rounded shadow-sm">
                                <RiMoneyDollarCircleLine className="w-6 h-6 text-slate-400 mb-4" />
                                <h3 className="text-lg font-bold mb-4">Pricing Models</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-100">
                                                <th className="py-2 font-bold text-slate-900">Feature</th>
                                                <th className="py-2 font-bold text-[#625df5]">Partner</th>
                                                <th className="py-2 font-bold text-slate-500">Independent</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-light text-slate-600">
                                            <tr>
                                                <td className="py-3 font-medium text-slate-800">Fee</td>
                                                <td className="py-3 font-bold text-slate-900">0%</td>
                                                <td className="py-3">5%</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium text-slate-800">Reqs</td>
                                                <td className="py-3">AriaPass logo & MC shoutout</td>
                                                <td className="py-3">None (White-label)</td>
                                            </tr>
                                            <tr>
                                                <td className="py-3 font-medium text-slate-800">Payouts</td>
                                                <td className="py-3">Instant</td>
                                                <td className="py-3">Instant</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-white p-6 border border-slate-200 rounded shadow-sm">
                                <RiTeamLine className="w-6 h-6 text-slate-400 mb-4" />
                                <h3 className="text-lg font-bold mb-2">Team Collaboration</h3>
                                <p className="text-sm text-slate-600 font-light leading-relaxed mb-4">
                                    Don't manage the door alone. On Standard and Premium tiers, invite team members to your dashboard.
                                </p>
                                <ul className="space-y-2 text-sm text-slate-600 font-light">
                                    <li className="flex items-center gap-2">
                                        <RiCheckLine className="w-4 h-4 text-emerald-500" /> Go to Event Settings {'>'} Collaborators
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <RiCheckLine className="w-4 h-4 text-emerald-500" /> Enter email to grant scanning access
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <RiCheckLine className="w-4 h-4 text-emerald-500" /> Payout settings remain hidden
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs Section */}
                <section>
                    <div className="flex items-center gap-3 my-6">
                        <div className="w-10 h-10 bg-[#625df5]/10 flex items-center justify-center rounded">
                            <RiQuestionAnswerLine className="text-[#625df5] w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
                    </div>

                    <div className="space-y-8">
                        {faqs.map((faqGroup, idx) => (
                            <div key={idx}>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                                    {faqGroup.category}
                                </h3>
                                <div className="space-y-3">
                                    {faqGroup.questions.map((item, qIdx) => (
                                        <div key={qIdx} className="bg-white p-5 border border-slate-200 rounded">
                                            <h4 className="font-bold text-slate-900 mb-2">{item.q}</h4>
                                            <p className="text-slate-600 text-sm font-light leading-relaxed">{item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-[#625df5] text-white p-8 md:p-12 mt-5 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-black tracking-tight mb-4">Still Need Help?</h2>
                        <p className="text-white/80 font-light mb-8 max-w-xl leading-relaxed">
                            If you couldn't find the answer to your question, our support team is ready to assist you around the clock.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <a href="mailto:support@ariapass.africa" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors p-4 rounded border border-white/10">
                                <RiMailSendLine className="w-6 h-6 text-white" />
                                <div>
                                    <p className="font-bold">Email Support</p>
                                    <p className="text-xs text-white/70 font-light">support@ariapass.africa</p>
                                </div>
                            </a>
                            <a href="mailto:hello@ariapass.africa" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors p-4 rounded border border-white/10">
                                <RiTeamLine className="w-6 h-6 text-white" />
                                <div>
                                    <p className="font-bold">Business Inquiries</p>
                                    <p className="text-xs text-white/70 font-light">hello@ariapass.africa</p>
                                </div>
                            </a>
                        </div>

                        <div className="mt-8 flex items-center justify-between p-4 bg-white/10 rounded border border-white/10">
                            <div>
                                <p className="font-bold">Live Chat</p>
                                <a href="tel:+2348026658956" className="text-sm text-white/70 font-light">Available 24/7 on your Organizer Dashboard.</a>
                            </div>
                            <RiArrowRightLine className="w-5 h-5 text-white/50" />
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}