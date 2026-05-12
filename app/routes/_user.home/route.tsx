import { Await, useOutletContext } from "react-router";
import NavigationSection from "./navigation-section";
import OrganiserProfileStatus from "./organiser-profile-status";
import type { Route } from "../_user.home/+types/route";
import { handleActionError } from "~/lib/logger.server";
import { getGuestEvents } from "~/handlers/user/events";
import { Suspense } from "react";
import EventCardSkeleton from "~/components/custom/events-card-skeleton";
import EventsMapper from "~/components/custom/event-mapper";

export async function loader({ request }: Route.LoaderArgs) {
    const events: Promise<OrganiserEvent[]> = getGuestEvents(request, 'events')
        .catch((error) => {
            handleActionError(error);
            return null;
        });

    return { events };
}

export default function UserDashboard({ loaderData }: Route.ComponentProps) {
    const user: any = useOutletContext();
    const { events } = loaderData;

    return (
        <div className="container">
            <OrganiserProfileStatus user={user} />
            <NavigationSection user={user} />

            <div>
                <Suspense fallback={<EventCardSkeleton />}>
                    <Await resolve={events}>
                        {(events) => <EventsMapper events={events} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}