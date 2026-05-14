import { Text } from '~/components/ui/text'
import type { Route } from '../_guest.events_.$slug/+types/route'
import { handleActionError } from '~/lib/logger.server'
import { getGuestEvent } from '~/handlers/user/events'
import { STORAGE_URL } from '~/config/defaults';
import { RiCalendar2Line, RiMap2Line, RiMapPin2Fill, RiTicketLine, RiTimeLine } from '@remixicon/react';
import { redirect } from 'react-router';
import { withMsg } from '~/lib/redirector';
import dayjs from 'dayjs';
import { isPastEventDate, to12HourFormat } from '~/lib/utils';
import HrWithText from '~/components/custom/hr-with-text';
import { FormatLineBreak } from '~/components/custom/format-line-break';
import Countdown from '~/components/custom/countdown';

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

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    return (
        <div className='container'>
            <Text.p className='mt-4 mb-8'>
                <Text.span className='opacity-50'>Events /</Text.span> {event.title}
            </Text.p>

            <section>
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start mb-20">
                    <div className="lg:col-span-4 flex flex-col gap-6 top-24">
                        <div className="h-auto md:h-auto w-full overflow-hidden bg-gray-100 shrink-0">
                            {event.bannerUrl ? (
                                <img src={`${STORAGE_URL}/${event.bannerUrl}`} alt={event.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-300"><RiTicketLine /></div>
                            )}
                        </div>
                        {!isPastEventDate(event.date, event.startTime) && (
                                <fieldset className="p-2 mb-6 text-center mx-auto bg-white border hidden md:block w-full">
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
                    </div>

                    <div className="lg:col-span-8 flex flex-col gap-5">
                        <section className='flex flex-col gap-6 md:gap-8 justify-start'>
                            <Text.h1 className='tracking-tight'>
                                {event.title}
                            </Text.h1>
                            <div className='flex items-start text-sm md:text-base gap-3'>
                                <RiCalendar2Line />
                                <Text.span>
                                    {formattedDate}
                                </Text.span>
                            </div>
                            <div className='flex items-start text-sm md:text-base gap-3'>
                                <RiTimeLine />
                                <Text.span>
                                    {to12HourFormat(event.startTime)}
                                </Text.span>
                            </div>
                            <div className='flex items-start text-sm md:text-base gap-3'>
                                <RiMapPin2Fill />
                                <Text.span>
                                    <Text.span className='font-semibold'>{event.venueName}</Text.span>, {event.venueAddress}
                                </Text.span>
                            </div>
                            <div className='flex items-start text-sm md:text-base gap-3'>
                                <RiMap2Line />
                                <Text.span className='capitalize'>
                                    {event.city}, {event.country}
                                </Text.span>
                            </div>
                        </section>

                        <HrWithText text='About this event' />

                        <section>
                            <FormatLineBreak input={event.description} />
                            <br /><br />

                            {!isPastEventDate(event.date, event.startTime) && (
                                <fieldset className="p-2 mb-6 text-center mx-auto bg-white border md:hidden">
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
                        </section>
                    </div>
                </div>
            </section>
        </div>
    )
}
