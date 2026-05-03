import type { Route } from '../_user.my-events/+types/route';
import { Link, redirect, useSearchParams, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import { parseForm } from '~/lib/utils';
import { useEffect, useState } from 'react';
import { defaultMeta } from '~/lib/meta';
import DefaultError from '~/components/custom/default-error';
import RecordFilter from '~/components/custom/record-filter';
import { RiAddLine } from '@remixicon/react';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import { requireUser } from '~/lib/auth.server';
import { handleActionError } from '~/lib/logger.server';
import { deleteOrganiserEvent, getOrganiserEvents } from '~/handlers/organiser/events';

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "My Events | AriaPass" },
    ];
}

export async function loader({ request }: { request: Request }) {
    const user = await requireUser(request);

    try {
        const isOrganiser = user && user.organiserProfile?.status === 'active'

        if (!isOrganiser) {
            return redirect('/dashboard?warning=')
        }
        const data = await getOrganiserEvents(request, 'organiser/events');
        return { events: data }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/dashboard')
    }
}

export async function action({ request }: Route.ClientActionArgs) {
    const credentials = await parseForm(request);
    try {
        await deleteOrganiserEvent(request, `organiser/events/${credentials.event_slug}`);
        return redirect("/my-events?info=action_success")
    } catch (error) {
        handleActionError(error);
        redirect("?error=action_failed")
    }
}

export default function MyEvents({ loaderData }: Route.ComponentProps) {
    const { events }: { events: OrganiserEvent[] } = loaderData;

    const [searchParams] = useSearchParams();
    const [filteredEvents, setFilteredEvents] = useState<OrganiserEvent[]>(events);

    useEffect(() => {
        const filtered = events.filter((submission) => {
            if (searchParams.get("status")) {
                return submission.status === searchParams.get("status");
            }
            return true;
        });
        setFilteredEvents(filtered)
    }, [searchParams, events]);

    return (
        <div className='container'>
            <section>
                <div className="flex flex-col lg:flex-row gap-7 justify-between lg:items-end">
                    <div>
                        <RecordFilter />
                    </div>

                    <div className="flex items-center gap-5 justify-between">
                        <Link to={'new'} className=''>
                            <Button>
                                <RiAddLine size={10} />
                                <span>New Event</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {(filteredEvents && filteredEvents.length) ? (
                    <div className="grid grid-cols-1 pt-8 items-stretch justify-start">
                        {filteredEvents.map((event) => (
                            <DetailedEventCard key={event.id} event={event} />
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    return <DefaultError error={error} />
}