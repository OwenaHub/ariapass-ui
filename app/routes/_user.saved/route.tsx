import type { Route } from '../_user.saved/+types/route';
import { redirect, useSearchParams, type MetaFunction } from 'react-router';
import { useEffect, useState } from 'react';
import EventCard from '~/components/cards/event-card';
import { defaultMeta } from '~/lib/meta';
import { getGuestSavedEvents } from '~/handlers/user/events';
import { handleActionError } from '~/lib/logger.server';

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Favourites | AriaPass" },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const savedEvents: OrganiserEvent[] = await getGuestSavedEvents(request, 'events/favourites');

        return { savedEvents }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/dashboard')
    }
}

export default function MyEvents({ loaderData }: Route.ComponentProps) {
    const { savedEvents }: { savedEvents: OrganiserEvent[] } = loaderData;

    const [searchParams] = useSearchParams();
    const [filteredEvents, setFilteredEvents] = useState<OrganiserEvent[]>(savedEvents);

    useEffect(() => {
        const filtered = savedEvents.filter((submission) => {
            if (searchParams.get("status")) {
                return submission.status === searchParams.get("status");
            }
            return true;
        });
        setFilteredEvents(filtered);
    }, [searchParams, savedEvents]);

    return (
        <div className='container'>
            <section>
                {(filteredEvents && filteredEvents.length) ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-8 items-stretch justify-start">
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className='pt-20 flex flex-col items-start gap-5'>
                        <p className="text-light text-sm text-muted-foreground text-center">
                            {searchParams.get('status')
                                ? <span>
                                    No {searchParams.get('status')} events
                                </span>
                                : <span>
                                    Nothing coming up at the moment
                                </span>
                            }
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
