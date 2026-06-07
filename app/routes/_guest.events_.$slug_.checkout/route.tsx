import type { Route } from '../_guest.events_.$slug_.checkout/+types/route';
import { redirect, useOutletContext, type MetaFunction } from 'react-router';
import { useState } from 'react';
import PaystackPurchaseButton from './paystack-purchase-button.client';
import { Button } from '~/components/ui/button';
import FormatPrice from '~/components/utility/format-price';
import { STORAGE_URL } from '~/config/defaults';
import { isPastEventDate } from '~/lib/utils';
import { RiArrowLeftLine, RiArrowRightLine, RiCheckFill, RiLock2Line, RiTimerFlashLine } from '@remixicon/react';
import { getGuestEvent } from '~/handlers/user/events';
import { withMsg } from '~/lib/redirector';
import { handleActionError } from '~/lib/logger.server';
import { APIRequest } from '~/service/api-request';
import { commitSession, getSession } from '~/session.server';

export const meta: MetaFunction = ({ data }: any) => {
    if (!data.event) {
        return [
            { title: "AriaPass - Discover the community behind the concerts" },
            { name: "description", content: "Discover the community behind the concerts" },
        ];
    }
    const event: OrganiserEvent = data.event;

    return [
        // Standard Meta Tags
        { title: `${event.title} | AriaPass` },
        { name: "description", content: event.description || "Discover the community behind the concerts" },
        { name: "theme-color", content: "#625DF5" },
        { name: "keywords", content: "concert community, music events, fan meetups, social ticketing, event organization, AriaPass, OwenaHub" },
        { name: "author", content: "OwenaHub Collective" },
        { name: "robots", content: "index, follow" },

        // Open Graph (Facebook, LinkedIn)
        { property: "og:title", content: `${event.title} | AriaPass` },
        { property: "og:description", content: event.description || "Discover the community behind the concerts" },
        { property: "og:image", content: `https://api.ariapass.africa/storage/banners/${event.bannerUrl}` },
        { property: "og:url", content: "https://api.ariapass.africa" },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@owenahub" },
        { name: "twitter:title", content: `${event.title} | AriaPass` },
        { name: "twitter:description", content: event.description || "Discover the community behind the concerts" },
        { name: "twitter:image", content: `https://api.ariapass.africa/storage/banners/${event.bannerUrl}` },
    ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const event: OrganiserEvent = await getGuestEvent(request, `events/${params.slug}`);

        if (isPastEventDate(event.date, event.startTime)
            || event.tickets.length === 0
            || event.status !== 'published') {
            return redirect(withMsg(`/events/${params.slug}`, 'info', 'action_failed'));
        }

        return { event };
    } catch (error: any) {
        handleActionError(error);
        return redirect(withMsg('/home', 'error', 'action_failed'));
    }
}

export async function action({ request }: Route.ActionArgs) {
    try {
        const req = new APIRequest(request);

        const data = await request.json();

        const response: any = await req.post(`/api/tickets/purchases/${data.ticket_id}`, {
            reference: data.reference,
            currency: "NGN",
            payment_method: "paystack",
            purchaser_name: data.purchaser_name,
            purchaser_email: data.purchaser_email,
            quantity: data.quantity,
            tickets: data.tickets,
        });

        const token = response?.auth_token;
        const user = response?.user;

        const headers = new Headers();

        if (token) {
            const session = await getSession(request.headers.get("Cookie"));
            session.set("token", token);
            session.set("user", user);
            headers.append("Set-Cookie", await commitSession(session));
        }

        return redirect(
            withMsg(`/tickets?reference=${data.reference}&message=Approved`, 'success', 'ticket_purchased'), {
            headers
        });

    } catch (error: any) {
        handleActionError(error);

        return {
            error: error.response?.data?.error || "Payment verification failed. Please contact support."
        };
    }
}

export default function EventCheckout({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent } = loaderData;
    const user: User = useOutletContext();

    const [ticket, setTicket] = useState<Ticket>(event.tickets[0]);
    const [next, setNext] = useState(false);

    let banner = event.bannerUrl
        ? `${STORAGE_URL}/${event.bannerUrl}`
        : "/images/banners/default-course-img.png";

    // Helper to calculate psychological scarcity triggers
    const getScarcityMessage = (item: Ticket) => {
        const remaining = item.quantityAvailable - item.ticketPurchases;
        if (remaining <= 0) return { text: "SOLD OUT", color: "bg-red-500 text-white border-transparent" };
        if (remaining <= 10) return { text: `Only ${remaining} left!`, color: "bg-orange-50 text-orange-600 border-orange-200" };
        if (item.ticketPurchases > 20) return { text: "Selling Fast", color: "bg-blue-50 text-blue-600 border-blue-200" };
        return null;
    };

    return (
        <div className='lg:px-14 min-h-screen bg-slate-50/50 pb-20'>
            <section className='container flex flex-col md:flex-row md:items-start py-10 md:gap-16 gap-10'>

                {/* --- LEFT COLUMN: STICKY ORDER SUMMARY & VISUALS --- */}
                <div className="bg-white max-w-sm w-full shadow-2xl shadow-slate-200/50 rounded overflow-hidden relative hidden md:block md:sticky md:top-10 transition-all duration-500 border border-slate-100">
                    <div className="relative aspect-4/5 w-full group overflow-hidden">
                        <img
                            src={banner}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>

                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full absolute top-5 left-5 shadow-sm text-slate-800">
                        {event.eventType}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h2 className="text-2xl font-bold mb-3 drop-shadow-md leading-tight">{event.title}</h2>
                        {event.status === 'completed' && (
                            <span className='bg-red-600 font-bold text-white text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg'>
                                {isPastEventDate(event.date, event.startTime) ? 'Event Ended' : 'Sold Out'}
                            </span>
                        )}
                    </div>
                </div>

                <div className='flex-1 max-w-xl mx-auto md:mx-0 py-4'>

                    {/* Progress Indicator */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className={`h-1.5 flex-1 rounded-full ${!next ? 'bg-theme' : 'bg-emerald-500'} transition-colors duration-500`}></div>
                        <div className={`h-1.5 flex-1 rounded-full ${next ? 'bg-theme' : 'bg-slate-200'} transition-colors duration-500`}></div>
                    </div>

                    <div className="mb-8">
                        <p className="text-sm font-semibold text-theme mb-2 uppercase tracking-widest">
                            {!next ? 'Step 1: Choose Ticket' : 'Step 2: Secure Payment'}
                        </p>
                        <h1 className='font-extrabold text-3xl tracking-tight text-slate-900'>
                            {!next ? "Select your pass" : "Almost there!"}
                        </h1>
                        <p className="text-slate-500 mt-2">
                            {!next ? "Choose the ticket tier that works best for you." : `Complete your purchase for the ${ticket?.name} ticket.`}
                        </p>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded shadow-sm border border-slate-100 relative">
                        {next && (
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                                className="w-max mb-6 -ml-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                                onClick={() => setNext(false)}
                            >
                                <RiArrowLeftLine className="mr-2 size-4" /> Back to tickets
                            </Button>
                        )}

                        {!next && (
                            <div className="space-y-4">
                                {event.tickets.map((item: Ticket) => {
                                    const scarcity = getScarcityMessage(item);
                                    const isSelected = item.id === ticket?.id;
                                    const isSoldOut = item.quantityAvailable - item.ticketPurchases <= 0;

                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => !isSoldOut && setTicket(item)}
                                            className={`
                                                relative overflow-hidden rounded p-5 border-2 transition-all duration-200 ease-in-out
                                                ${isSoldOut ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-200' : 'cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 bg-white'}
                                                ${isSelected ? 'border-theme ring-4 ring-theme/10 bg-indigo-50/30' : 'border-slate-100'}
                                            `}
                                        >
                                            <div className="flex items-center justify-between relative z-10">
                                                <div>
                                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3 mb-1">
                                                        <span className="font-bold text-lg text-slate-900">{item.name}</span>
                                                        {scarcity && (
                                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border flex items-center gap-1 ${scarcity.color}`}>
                                                                {(scarcity.text.includes('Fast') || scarcity.text.includes('left')) && <RiTimerFlashLine className="size-3" />}
                                                                {scarcity.text}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">
                                                        General Admission
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-5">
                                                    <p className={`font-extrabold text-xl ${isSelected ? 'text-theme' : 'text-slate-900'}`}>
                                                        <FormatPrice price={item.price} />
                                                    </p>
                                                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors
                                                        ${isSelected ? 'bg-theme border-theme' : 'border-slate-300'}`}
                                                    >
                                                        {isSelected && <RiCheckFill className='text-white size-4' />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="pt-6 mt-6 border-t border-slate-100">
                                    <Button
                                        className="w-full"
                                        size={"lg"}
                                        disabled={!ticket || (ticket.quantityAvailable - ticket.ticketPurchases <= 0)}
                                        onClick={() => setNext(!next)}
                                    >
                                        Continue to Payment <RiArrowRightLine className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {next && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Order Summary Ribbon */}
                                <div className="bg-slate-50 rounded p-5 mb-8 border border-slate-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Order Summary</p>
                                        <p className="font-bold text-slate-900">{ticket.name} Ticket</p>
                                    </div>
                                    <p className="font-extrabold text-2xl text-theme">
                                        <FormatPrice price={ticket.price} />
                                    </p>
                                </div>

                                <PaystackPurchaseButton
                                    user={user}
                                    organiser={event.organiser as OrganiseProfile}
                                    ticket={ticket}
                                />
                            </div>
                        )}
                    </div>

                    {/* --- ENHANCED TRUST SIGNALS --- */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 text-slate-400">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">
                            <RiLock2Line className="size-4 text-emerald-500" />
                            Guaranteed Safe Checkout
                        </div>
                        <p className="text-[11px] flex items-center font-medium">
                            Powered securely by
                            <img src="/images/logos/paystack.png" alt="Paystack Logo" className="h-4 inline-block mx-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-300" />
                            Paystack
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}