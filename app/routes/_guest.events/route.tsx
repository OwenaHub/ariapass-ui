import { Suspense } from 'react'
import type { Route } from '../_guest.events/+types/route';
import { getGuestEvents } from '~/handlers/user/events';
import { handleActionError } from '~/lib/logger.server';
import EventCardSkeleton from '~/components/custom/events-card-skeleton';
import { Await, Link } from 'react-router';
import EventsMapper from '~/components/custom/event-mapper';
import SearchBox from '../_guest._index/search-box';
import { RiMusicLine } from '@remixicon/react';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { BrMd } from '~/components/ui/line-break';

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);

    const events: Promise<OrganiserEvent[]> = getGuestEvents(request, `events/${url.search}`)
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
                <div className="flex gap-2 items-center mt-4 mb-8">
                    <RiMusicLine className='text-theme' />
                    <Text.h1 className="font-bold">
                        Events and Concerts
                    </Text.h1>
                </div>
                <div>
                    <SearchBox />
                </div>
                <div className="mt-16 mb-10">

                    <Suspense fallback={<EventCardSkeleton />}>
                        <Await resolve={events}>
                            {(events) => <EventsMapper events={events} />}
                        </Await>
                    </Suspense>
                </div>

                <div className="mt-10">
                    <div
                        className="h-100 rounded py-6 px-6 my-10 flex flex-col justify-between"
                        style={{
                            backgroundImage: `linear-gradient(90deg, #000000, #cccccc00), url('/images/banners/sam-moghadam.jpg')`,
                            backgroundSize: 'cover, cover',
                            backgroundPosition: 'center, center',
                        }}
                    >
                        <div />
                        <div className="text-white">
                            <div className="mb-10 tracking-tighter">
                                <h2 className="text-3xl font-bold tracking-tighter mb-4">
                                    Get more leads, <br className="md:hidden" /> Pay no fees
                                </h2>
                                <p className="font-light text-sm">Rank higher, skip the fees, and level up your profile — all <BrMd /> for $0/month.</p>
                            </div>

                            <Link
                                to={"/organisers"}>
                                <Button className="w-full md:w-max rounded-full px-10 py-6 bg-white/20">
                                    Become an Organiser
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
