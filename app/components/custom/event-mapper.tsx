import EventCard from "../cards/event-card";
import { LargeEmptyState } from "./empty-state";

export default function EventsMapper({ events }: { events: OrganiserEvent[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
            {events.length
                ? events.map((ev) => <EventCard event={ev} key={ev.slug} />)
                : <LargeEmptyState resource="events" />}
        </div>
    )
}

