import dayjs from 'dayjs';
import { STORAGE_URL } from '~/config/defaults';
import { Link } from 'react-router';
import { isPastEventDate } from '~/lib/utils';
import { RiEyeLine, RiHeartFill } from '@remixicon/react';

export default function EventCard({ event, index }: { event: OrganiserEvent, index?: number }) {
    const formattedDate = dayjs(event.date).format('MMM DD').toUpperCase();

    // Add the same logic you used in CheckoutButton
    const isEventOver = isPastEventDate(event.date, event.startTime);
    const isCompleted = event.status === 'completed';
    const showBanner = isCompleted || isEventOver;

    return (
        <div key={index} className="border-gray-100 flex flex-col gap-1 group animated fadeIn">
            <div className="relative bg-gray-100 group-hover:opacity-85 overflow-hidden rounded transition h-70 md:h-78">
                <Link to={`/events/${event.slug}`}>
                    <span aria-hidden="true" className="z-10 absolute inset-0" />
                </Link>

                {event.bannerUrl && (
                    <img
                        src={event.bannerUrl && `${STORAGE_URL}/${event.bannerUrl}`}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                )}

                {/* Overlay background */}
                <div className='absolute top-0 left-0 w-full min-h-full bg-linear-to-t from-black/60 to-black/20' />

                {/* Upperside of the card */}
                <div className="absolute flex items-start justify-between top-2 w-full left-0 right-0 py-0.5 px-2.5">
                    <div className='bg-white/80 w-max py-0.5 px-1.5 rounded shadow-lg'>
                        <div className='flex flex-col justify-start items-center'>
                            <p className="text-lg md:text-xl tracking-tighter font-extrabold">{formattedDate.split(' ')[1]}</p>
                            <p className="-mt-1.5 text-xs md:text-sm font-light uppercase">{formattedDate.split(' ')[0]}</p>
                        </div>
                    </div>
                </div>

                <div className='absolute bottom-0 left-0 w-full text-white p-2'>
                    {/* Render if it's past the date OR marked as completed */}
                    {showBanner && (
                        <div className='bg-black/80 text-white text-xs p-2 rounded w-max mb-1'>
                            {isEventOver ? 'Ended' : 'Sold Out'}
                        </div>
                    )}
                </div>
            </div>

            <div className='flex items-center justify-between p-1 w-full max-w-full overflow-hidden'>
                <div className='flex items-center gap-3 shrink-0'>
                    <div className="flex items-center gap-0.5 text-xs font-semibold">
                        <RiHeartFill className='size-4.5 text-gray-500' />
                        <span className='text-gray-700'>{event.likes}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-xs font-semibold">
                        <RiEyeLine className='size-4.5 text-gray-500' />
                        <span className='text-gray-700'>{event.views}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}