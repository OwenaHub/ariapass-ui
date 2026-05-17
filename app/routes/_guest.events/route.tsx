import { Suspense } from 'react'
import type { Route } from '../_guest.events/+types/route';
import { getGuestEvents } from '~/handlers/user/events';
import { handleActionError } from '~/lib/logger.server';
import { RiMusicLine } from '@remixicon/react';
import { Text } from '~/components/ui/text';
import EventCardSkeleton from '~/components/custom/events-card-skeleton';
import { Await } from 'react-router';
import EventsMapper from '~/components/custom/event-mapper';

export async function loader({ request }: Route.LoaderArgs) {
    const events: Promise<OrganiserEvent[]> = getGuestEvents(request, 'events')
        .catch((error) => {
            handleActionError(error);
            return null;
        });

    return { events };
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
    const { events } = loaderData;

    return (
        <div>
            <main className="container">
                <div className="mt-5 mb-10">
                    <div className="flex gap-1 items-center mb-6">
                        <RiMusicLine className='text-theme' />
                        <Text.h1>
                            Upcoming
                        </Text.h1>
                    </div>
                    <Suspense fallback={<EventCardSkeleton />}>
                        <Await resolve={events}>
                            {(events) => <EventsMapper events={events} />}
                        </Await>
                    </Suspense>
                </div>
            </main>
        </div>
    );
};
