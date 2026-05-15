import { Text } from '~/components/ui/text'
import type { Route } from '../_guest.events_.$slug/+types/route'
import { handleActionError } from '~/lib/logger.server'
import { getGuestEvent } from '~/handlers/user/events'
import { STORAGE_URL } from '~/config/defaults';
import { RiCalendar2Line, RiMap2Line, RiMapPinLine, RiPokerHeartsFill, RiShareForwardLine, RiTicketLine, RiTimeLine } from '@remixicon/react';
import { Link, redirect, useOutletContext } from 'react-router';
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

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const TOTAL_TICKETS: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.quantityAvailable;
    }, 0);

    const TOTAL_TICKETS_SALES: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.ticketPurchases;
    }, 0);

    return (
        <div className='container relative'>
            <Text.p className='mt-4 mb-8'>
                <Text.span className='opacity-50'>
                    <Link to="/events">Events /</Link></Text.span>{" "}
                {event.title}
            </Text.p>
            <div className={`${scrolled && 'hidden'} z-10 md:hidden fixed w-full bg-linear-to-t from-black/70 to-transparent bottom-0 right-0 left-0 h-20 p-4 pb-20`}>
                <CheckoutButton
                    user={user}
                    event={event}
                />
            </div>

            <section>
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start mb-20">
                    <div className="lg:col-span-4 flex flex-col gap-6 top-24">
                        <div className="h-auto md:h-auto w-full border border-gray-100 overflow-hidden bg-gray-100 shrink-0">
                            {event.bannerUrl ? (
                                <img src={`${STORAGE_URL}/${event.bannerUrl}`} alt={event.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-300"><RiTicketLine /></div>
                            )}
                        </div>
                        {!isPastEventDate(event.date, event.startTime) && (
                            <fieldset className="p-2 mb-1 text-center mx-auto bg-white border hidden md:block w-full">
                                <legend className="text-xs font-semibold uppercase px-2 py-1">
                                    Count Down to event
                                </legend>
                                <Countdown
                                    eventDate={event.date}
                                    startTime={event.startTime}
                                    onComplete={() => console.log("Event has started!")}
                                    className="text-gray-500 flex items-start gap-1 mx-auto"
                                />
                            </fieldset>
                        )}
                        <div className="hidden md:block">
                            <CheckoutButton
                                user={user}
                                event={event}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-4">
                        <section className='flex flex-col gap-6 md:gap-7 justify-start'>
                            <section>
                                <Text.h1 className='tracking-tight leading-7'>
                                    {event.title}
                                </Text.h1>
                                <div className='flex items-stretch gap-3 mt-5'>
                                    <div className="px-2 py-1 bg-stone-200 text-primary tracking-tight flex flex-col gap-0.5">
                                        <Text.small className='font-light text-[10px]'>
                                            Starts from
                                        </Text.small>
                                        <Text.small className='font-bold'>
                                            {event.tickets.length
                                                ? <FormatPrice price={Math.min(...event.tickets.map(ticket => Number(ticket.price)))} />
                                                : 'No tickets available'
                                            }
                                        </Text.small>
                                    </div>
                                    {event.engagementVisible ? (
                                        <div className="px-2 py-1 bg-stone-200 text-primary tracking-tight flex flex-col gap-0.5">
                                            <Text.small className='font-light text-[10px]'>
                                                Tickets sold
                                            </Text.small>
                                            <div className='flex items-end'>
                                                <Text.small className='font-bold'>
                                                    {TOTAL_TICKETS_SALES}
                                                </Text.small>
                                                <Text.small className='font-thin'>/{TOTAL_TICKETS}</Text.small>
                                            </div>
                                        </div>
                                    ) : ""}

                                </div>
                            </section>
                            <div className='flex items-center text-sm gap-3'>
                                <RiCalendar2Line size={20} />
                                <Text.span>
                                    {formattedDate}
                                </Text.span>
                            </div>
                            <div className='flex items-center text-sm gap-3'>
                                <RiTimeLine size={20} />
                                <Text.span>
                                    {to12HourFormat(event.startTime)}
                                </Text.span>
                            </div>
                            <div className='flex items-center text-sm gap-3'>
                                <RiMapPinLine size={20} />
                                <Text.span>
                                    <Text.span>{event.venueName}</Text.span>,{" "}
                                    {event.venueAddress}
                                </Text.span>
                            </div>
                            <div className='flex items-center text-sm gap-3'>
                                <RiMap2Line size={20} />
                                <Text.span className='capitalize'>
                                    {event.city}, {event.country}
                                </Text.span>
                            </div>
                        </section>

                        <HrWithText text='About this event' />

                        <section>
                            <FormatLineBreak input={event.description} />
                            <br />

                            <div>
                                <Text.p className='font-bold'>Note from Organiser</Text.p>
                                <Text.p className={event.extraInfo ? "" : "text-gray-400"}>
                                    {event.extraInfo ?? "No notes, thats all :)"}{" "}
                                    <Text.span className='text-primary'>
                                        — contact organisers <a className='underline text-blue-500' href={`tel:+${event.organiser.contactPhone}`}>
                                            {formatPhone(event.organiser.contactPhone)}
                                        </a>
                                    </Text.span>
                                </Text.p>
                            </div>

                            <section className='flex items-center gap-4 py-10'>
                                <RedirectOrFetch user={user} route={`/events/toggle-like/${event.slug}`}>
                                    <Button
                                        className="relative flex items-center gap-1"
                                        variant={'secondary'}
                                    >
                                        <span className="absolute -top-2 -right-2 bg-muted text-muted-foreground border text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                            {(event.likes ?? 0) > 0 && "+"}{event.likes === 0 ? '👀' : event.likes}
                                        </span>
                                        <div className={`${event.liked && 'text-red-500!'}`}>
                                            <RiPokerHeartsFill
                                                size={18}
                                            />
                                        </div>
                                        {event.liked
                                            ? (<span className="">Saved</span>)
                                            : (<span className="">Save</span>)
                                        }
                                    </Button>
                                </RedirectOrFetch>
                                <Button
                                    variant={"secondary"}
                                    onClick={() => {
                                        const shareData = {
                                            title: event.title,
                                            text: event.description,
                                            url: window.location.href
                                        };
                                        navigator.share(shareData);
                                    }}
                                >
                                    <div>
                                        <RiShareForwardLine size={18} />
                                    </div>
                                    <span>Share</span>
                                </Button>
                            </section>

                            <section className='md:hidden'>
                                {!isPastEventDate(event.date, event.startTime) && (
                                    <fieldset className="p-2 mb-6 text-center mx-auto bg-white border">
                                        <legend className="text-xs font-semibold px-2 py-1">
                                            Count Down
                                        </legend>
                                        <Countdown
                                            eventDate={event.date}
                                            startTime={event.startTime}
                                            onComplete={() => console.log("Event has started!")}
                                            className="text-gray-500 flex items-start gap-1 mx-auto"
                                        />
                                    </fieldset>
                                )}
                                <CheckoutButton
                                    user={user}
                                    event={event}
                                />
                            </section>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}
