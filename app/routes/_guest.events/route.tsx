import { Suspense, useMemo } from 'react'
import type { Route } from '../_guest.events/+types/route';
import { getGuestEvents } from '~/handlers/user/events';
import { handleActionError } from '~/lib/logger.server';
import EventCardSkeleton from '~/components/custom/events-card-skeleton';
import { Await, Link, useSearchParams } from 'react-router';
import EventsMapper from '~/components/custom/event-mapper';
import { Button } from '~/components/ui/button';
import { BrMd } from '~/components/ui/line-break';
import dayjs from 'dayjs';
import { dateCategories, genreCategories } from '~/lib/categories';

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
    const [searchParams] = useSearchParams();

    // Determine the active banner and text based on URL parameters
    const heroContent = useMemo(() => {
        const startDate = searchParams.get('start_date');
        const endDate = searchParams.get('end_date');
        const category = searchParams.get('category');
        const filter = searchParams.get('filter');

        if (startDate && endDate) {
            const matchedDateCat = dateCategories.find(
                (c) => c.startDate === startDate && c.endDate === endDate
            );
            if (matchedDateCat) {
                return {
                    title: matchedDateCat.title,
                    description: `Events from ${dayjs(matchedDateCat.startDate).format('MMM D')} to ${dayjs(matchedDateCat.endDate).format('MMM D')}.`,
                    bannerUrl: matchedDateCat.bannerUrl
                };
            }
        }

        if (category) {
            const matchedGenreCat = genreCategories.find(
                (c) => c.href.includes(`category=${category}`)
            );
            if (matchedGenreCat) {
                return {
                    title: matchedGenreCat.title,
                    description: matchedGenreCat.description,
                    bannerUrl: '/images/banners/sam-moghadam.jpg' // Fallback for genres
                };
            }
        }

        // 3. Check if it's the "All Events" timeline
        if (filter === 'all') {
            const allCat = genreCategories.find((c) => c.href.includes('filter=all'));
            return {
                title: allCat?.title || "Event Timeline",
                description: allCat?.description || "See all events from the past, present and upcoming.",
                bannerUrl: '/images/banners/sam-moghadam.jpg'
            };
        }

        // 4. Default state (Upcoming Events)
        return {
            title: "Discover Events",
            description: "Find the best upcoming concerts, festivals, and live shows near you.",
            bannerUrl: '/images/banners/sam-moghadam.jpg'
        };
    }, [searchParams]);

    return (
        <div>
            {/* Dynamic Hero Section */}
            <section
                className="relative h-[40vh] min-h-75 md:h-[50vh] w-full flex flex-col justify-end pb-12 px-4 md:px-8"
                style={{
                    backgroundImage: `url('${heroContent.bannerUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 z-0" />

                {/* Hero Content */}
                <div className="container relative z-10 mx-auto px-0 md:px-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-3">
                        {heroContent.title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl">
                        {heroContent.description}
                    </p>
                </div>
            </section>

            <main className="container">
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

                            <Link to="/organisers">
                                <Button className="w-full md:w-max rounded-full px-10 py-6 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/10 text-white font-bold">
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