import { Text } from '~/components/ui/text'
import type { Route } from '../_guest.events_.$slug/+types/route'
import { handleActionError } from '~/lib/logger.server'
import { getGuestEvent } from '~/handlers/user/events'
import { STORAGE_URL } from '~/config/defaults';
import {
    RiArrowRightSFill,
    RiCalendar2Line,
    RiMap2Line,
    RiMapPinLine,
    RiPokerHeartsFill,
    RiShareForwardLine,
    RiTicketLine,
    RiTimeLine,
    RiStore2Line,
    RiChat3Line,
    RiUserSmileFill
} from '@remixicon/react';
import { Link, redirect, useOutletContext, type MetaFunction } from 'react-router';
import { withMsg } from '~/lib/redirector';
import dayjs from 'dayjs';
import { formatPhone, isPastEventDate, to12HourFormat } from '~/lib/utils';
import HrWithText from '~/components/custom/hr-with-text';
import { FormatLineBreak } from '~/components/custom/format-line-break';
import Countdown from '~/components/custom/countdown';
import CheckoutButton from './checkout-button';
import { useEffect, useState } from 'react';
import RedirectOrFetch from '~/components/custom/redirect-or-fetch';
import { Button } from '~/components/ui/button';
import FormatPrice from '~/components/utility/format-price';

export const meta: MetaFunction = ({ data }: any) => {
    if (!data.event) {
        return [
            { title: "AriaPass - Discover the community behind the concerts" },
            { name: "description", content: "Discover the community behind the concerts" },
        ];
    }
    const event: OrganiserEvent = data.event;

    return [
        { title: `${event.title} | AriaPass` },
        { name: "description", content: event.description || "Discover the community behind the concerts" },
        { name: "theme-color", content: "#000000" },
        { name: "keywords", content: "concert community, music events, fan meetups, social ticketing, event organization, AriaPass, OwenaHub" },
        { name: "author", content: "OwenaHub Collective" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: `${event.title} | AriaPass` },
        { property: "og:description", content: event.description || "Discover the community behind the concerts" },
        { property: "og:image", content: `${STORAGE_URL}/${event.bannerUrl}` },
        { property: "og:url", content: "https://api.ariapass.africa" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@owenahub" },
        { name: "twitter:title", content: `${event.title} | AriaPass` },
        { name: "twitter:description", content: event.description || "Discover the community behind the concerts" },
        { name: "twitter:image", content: `${STORAGE_URL}/${event.bannerUrl}` },
    ];
};

export async function loader({ request, params }: Route.LoaderArgs) {
    try {
        const event: OrganiserEvent = await getGuestEvent(request, `events/${params.slug}`);
        return { event };
    } catch (error) {
        handleActionError(error);
        return redirect(withMsg('/', 'error', 'action_failed'));
    }
}

export default function EventView({ loaderData }: Route.ComponentProps) {
    const { event } = loaderData;
    const user: User = useOutletContext();
    const [scrolled, setScrolled] = useState<boolean>(false);

    // State to toggle comment button visibility like YouTube does
    const [commentFocused, setCommentFocused] = useState(false);

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const TOTAL_TICKETS: number = event.tickets.reduce((sum: number, ticket: Ticket) => sum + ticket.quantityAvailable, 0);
    const TOTAL_TICKETS_SALES: number = event.tickets.reduce((sum: number, ticket: Ticket) => sum + ticket.ticketPurchases, 0);

    return (
        <div className='container relative'>
            <Text.p className='mt-2 mb-4 truncate text-nowrap'>
                <Text.span className='opacity-50'>
                    <Link to="/events">Events /</Link>
                </Text.span>{" "}
                <Text.span className='font-medium'>
                    {event.title}
                </Text.span>
            </Text.p>

            {/* Mobile sticky checkout */}
            <div className={`${scrolled && 'hidden'} z-20 md:hidden fixed w-full bg-linear-to-t from-black/70 to-transparent bottom-0 right-0 left-0 h-20 p-4 pb-20`}>
                <CheckoutButton user={user} event={event} />
            </div>

            <section>
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start mb-20">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">

                        {/* Image Wrapper with YouTube-style Glow */}
                        <div className="relative w-full">
                            {/* The Ambient Glow Layer */}
                            {event.bannerUrl && (
                                <div className="absolute -inset-4 -z-10 opacity-50 blur-3xl scale-70 pointer-events-none">
                                    <img src={`${STORAGE_URL}/${event.bannerUrl}`} alt="" className="h-full w-full object-cover" />
                                </div>
                            )}

                            {/* The Actual Image */}
                            <div className="relative z-10 rounded shadow-xl h-auto md:h-auto w-full border border-gray-100 overflow-hidden bg-gray-900 shrink-0">
                                {event.bannerUrl ? (
                                    <img src={`${STORAGE_URL}/${event.bannerUrl}`} alt={event.title} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-500 py-20 bg-gray-100">
                                        <RiTicketLine size={48} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {!isPastEventDate(event.date, event.startTime) && (
                            <fieldset className="p-2 mb-1 text-center mx-auto bg-white border border-stone-200 rounded-xl shadow-sm hidden md:block w-full">
                                <legend className="text-[10px] text-gray-500 font-bold uppercase px-3 py-1">
                                    Countdown to event
                                </legend>
                                <Countdown
                                    eventDate={event.date}
                                    startTime={event.startTime}
                                    onComplete={() => console.log("Event has started!")}
                                    className="text-gray-700 flex items-start gap-1 mx-auto pb-1"
                                />
                            </fieldset>
                        )}

                        <div className="hidden md:block">
                            <CheckoutButton user={user} event={event} />
                        </div>

                        {(event.eventProgram && event.eventProgram?.length > 0) && (
                            <div className="rounded-xl border border-stone-200 p-4 bg-stone-50 shadow-sm">
                                <Text.p className='mb-1 font-bold'>See Event Program</Text.p>
                                <Text.p className='text-gray-600 font-light leading-relaxed text-sm'>
                                    Note that the program is subject to change, so be sure to check back for updates as the event date approaches.
                                </Text.p>
                                <Link to="program" className="text-sm font-semibold text-blue-600 mt-3 flex items-center group w-max">
                                    <span className="group-hover:underline">View Program</span>
                                    <RiArrowRightSFill size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-8 flex flex-col gap-4">
                        <section className='flex flex-col gap-4 justify-start'>
                            <section className="mb-3">
                                <Text.h1 className='tracking-tight font-black leading-tight text-3xl md:text-4xl'>
                                    {event.title}
                                </Text.h1>
                                <div className='flex items-stretch gap-4 mt-5'>
                                    <div className="px-3 py-2 bg-stone-100 border border-stone-200 text-primary rounded tracking-tight flex flex-col gap-0.5">

                                        {event.tickets.length > 0 && (
                                            <Text.p className="text-xs text-gray-500 ">
                                                Starting from
                                            </Text.p>
                                        )}
                                        <Text.p className='font-black text-lg'>
                                            {event.tickets.length
                                                ? <FormatPrice price={Math.min(...event.tickets.map(ticket => Number(ticket.price)))} />
                                                : 'No tickets on sale'
                                            }
                                        </Text.p>
                                    </div>

                                    {event.engagementVisible && event.tickets.length !== 0 ? (
                                        <div className="px-3 py-2 bg-stone-100 border border-stone-200 text-primary rounded tracking-tight flex flex-col gap-0.5">
                                            <Text.p className="text-xs text-gray-500 ">
                                                Tickets sold
                                            </Text.p>
                                            <div className='flex items-baseline font-black text-lg'>
                                                <Text.p className={`${TOTAL_TICKETS_SALES === 0 ? "text-gray-400" : "text-theme"}`}>
                                                    {TOTAL_TICKETS_SALES}
                                                </Text.p>
                                                <Text.p className="text-sm text-gray-400 font-medium">/{TOTAL_TICKETS}</Text.p>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </section>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                                <div className='flex items-start text-sm gap-3'>
                                    <div className="shrink-0 size-10 rounded-full bg-stone-100 border text-primary flex items-center justify-center">
                                        <RiCalendar2Line size={20} />
                                    </div>
                                    <div>
                                        <Text.p className='text-gray-400 mb-1'>
                                            {isPastEventDate(event.date, event.startTime) ? "Event Date" : "Happening on"}
                                        </Text.p>
                                        <Text.p className="font-semibold">{formattedDate}</Text.p>
                                    </div>
                                </div>
                                <div className='flex items-start text-sm gap-3'>
                                    <div className="shrink-0 size-10 rounded-full bg-stone-100 border text-primary flex items-center justify-center">
                                        <RiTimeLine size={20} />
                                    </div>
                                    <div>
                                        <Text.p className='text-gray-400 mb-1'>Start time</Text.p>
                                        <Text.p className="font-semibold">{to12HourFormat(event.startTime)}</Text.p>
                                    </div>
                                </div>
                                <div className='flex items-start text-sm gap-3'>
                                    <div className="shrink-0 size-10 rounded-full bg-stone-100 border text-primary flex items-center justify-center">
                                        <RiMapPinLine size={20} />
                                    </div>
                                    <div>
                                        <Text.p className='text-gray-400 mb-1'>Address</Text.p>
                                        <Text.p className='leading-tight font-medium'>
                                            <span className="font-bold">{event.venueName}</span>, <br className="hidden sm:block" />
                                            <span className='capitalize text-gray-600'>{event.venueAddress}</span>
                                        </Text.p>
                                    </div>
                                </div>
                                <div className='flex items-start text-sm gap-3'>
                                    <div className="shrink-0 size-10 rounded-full bg-stone-100 border text-primary flex items-center justify-center">
                                        <RiMap2Line size={20} />
                                    </div>
                                    <div>
                                        <Text.p className='text-gray-400 mb-1'>Location</Text.p>
                                        <Text.p className='capitalize font-semibold'>{event.city}, {event.country}</Text.p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="mt-6">
                            <HrWithText text='About this event' />
                        </div>

                        <section>
                            <div className="text-[15px] leading-relaxed text-gray-800">
                                <FormatLineBreak input={event.description} />
                            </div>

                            {/* 2. Organized By Card */}
                            <div className="mt-8 p-5 bg-stone-50 border border-stone-200 rounded flex items-start gap-4">
                                <div className="h-12 w-12 rounded-full bg-stone-200 border-2 border-white shadow-sm flex items-center justify-center text-xl font-black text-stone-500 shrink-0 uppercase">
                                    {event.organiser?.organiserName?.charAt(0) || <RiStore2Line size={20} />}
                                </div>
                                <div>
                                    <Text.p className="text-xs text-gray-400 mb-1">
                                        Curated by
                                    </Text.p>
                                    <Text.p className="font-bold text-xl text-primary leading-none mb-2">
                                        {event.organiser?.organiserName || 'Event Organizer'}
                                    </Text.p>
                                    <Text.p className="text-sm text-gray-600 flex flex-wrap gap-1">
                                        <span>For inquiries:</span>
                                        <a className='font-semibold text-blue-600 hover:underline' href={`tel:+${event.organiser?.contactPhone}`}>
                                            {formatPhone(event.organiser?.contactPhone)}
                                        </a>
                                    </Text.p>
                                    {event.extraInfo && (
                                        <div className="mt-3 text-sm text-gray-600 bg-white p-3 rounded border border-stone-100">
                                            {event.extraInfo}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <section className='flex items-center gap-4 py-8 border-b border-gray-100'>
                                <RedirectOrFetch user={user} route={`/events/toggle-like/${event.slug}`}>
                                    <Button
                                        className="relative flex items-center gap-2 rounded-full"
                                        variant={'secondary'}
                                    >
                                        <div className={`${event.liked ? 'text-rose-500' : 'text-gray-500'}`}>
                                            <RiPokerHeartsFill size={18} />
                                        </div>
                                        <span className="font-semibold">
                                            {event.liked ? "Saved" : "Save"}
                                        </span>
                                        {/* Subtle badge for counts */}
                                        {(event.likes ?? 0) > 0 && (
                                            <span className="ml-1 pl-3 border-l border-gray-300 text-xs font-bold text-gray-500">
                                                {event.likes}
                                            </span>
                                        )}
                                    </Button>
                                </RedirectOrFetch>
                                <Button
                                    variant={"secondary"}
                                    className="rounded-full gap-2"
                                    onClick={() => {
                                        const shareData = {
                                            title: event.title,
                                            text: event.description,
                                            url: window.location.href
                                        };
                                        navigator.share(shareData);
                                    }}
                                >
                                    <RiShareForwardLine size={18} className="text-gray-500" />
                                    <span className="font-semibold">Share</span>
                                </Button>
                            </section>

                            {/* 3. Comment Section UI */}
                            <section className="py-8">
                                <div className="flex items-center gap-2 mb-6">
                                    <Text.h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                                        Comments
                                    </Text.h2>
                                    <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">0</span>
                                </div>

                                {/* YouTube Style Add Comment Input */}
                                <div className="flex gap-4 items-start mb-10">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 border border-white shadow-sm flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                                        {user ? (
                                            <span className="font-bold text-gray-600 uppercase">
                                                {user.name?.charAt(0) || user.email?.charAt(0)}
                                            </span>
                                        ) : (
                                            <RiUserSmileFill size={20} />
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <textarea
                                            placeholder="Add a comment..."
                                            className="w-full border-b border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-gray-900 focus:border-b-2 resize-none transition-all placeholder:text-gray-500"
                                            rows={1}
                                            onFocus={() => setCommentFocused(true)}
                                        />
                                        {commentFocused && (
                                            <div className="flex justify-end gap-2 mt-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-full hover:bg-gray-100 font-semibold"
                                                    onClick={() => setCommentFocused(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="rounded-full font-semibold px-5"
                                                >
                                                    Comment
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Dummy Empty State (Map actual comments here later) */}
                                <div className="text-center py-12 flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <RiChat3Line size={32} className="mb-3 text-gray-300" />
                                    <Text.p className="text-sm font-medium">No comments yet.</Text.p>
                                    <Text.p className="text-xs">Be the first to start the conversation!</Text.p>
                                </div>
                            </section>

                            <section className='md:hidden mt-8'>
                                {!isPastEventDate(event.date, event.startTime) && (
                                    <fieldset className="p-2 mb-6 rounded-xl text-center mx-auto bg-stone-50 border border-stone-200">
                                        <legend className="text-[10px] font-bold text-gray-500 px-3 py-1 uppercase">
                                            Countdown
                                        </legend>
                                        <Countdown
                                            eventDate={event.date}
                                            startTime={event.startTime}
                                            onComplete={() => console.log("Event has started!")}
                                            className="text-gray-700 flex items-start gap-1 mx-auto pb-1"
                                        />
                                    </fieldset>
                                )}
                                <CheckoutButton user={user} event={event} />
                            </section>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}