import { RiCalendarScheduleLine } from "@remixicon/react";
import EventCard from "../cards/event-card";

export default function EventsMapper({ events }: { events: OrganiserEvent[] }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pb-5">
            {events.length ? events.map((ev) => <EventCard event={ev} key={ev.slug} />) : <EmptyState resource="events" />}
        </div>
    )
}

function EmptyState({ resource = "Content" }: { resource?: string }) {
    return (
        <div className="animated fadeIn col-span-5 flex flex-col gap-4 items-center justify-center text-center py-10 px-4">
            <div >
                <RiCalendarScheduleLine className="mb-4 h-30 w-30 text-gray-400" strokeWidth={0.5} />
            </div>
            <h2 className="text-2xl font-semibold tracking-tighter">No {resource} available</h2>
            <p className="text-gray-500 mb-4 text-sm">
                It seems like there's nothing here yet.
            </p>
        </div>
    );
}