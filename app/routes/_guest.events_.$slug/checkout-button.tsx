import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import { Link } from "react-router";
import RedirectOrFetch from "~/components/custom/redirect-or-fetch";
import { Button } from "~/components/ui/button";
import { isPastEventDate } from "~/lib/utils";

export default function CheckoutButton({ event, user }: { event: OrganiserEvent, user: User }) {
    const hasTickets = event.tickets && event.tickets.length > 0;

    // Check if free (price is 0 OR '0.00')
    const isFreeEvent = hasTickets && event.tickets.length < 2 && Number(event.tickets[0].price) === 0;

    const isEventOver = isPastEventDate(event.date, event.startTime);
    const isCompleted = event.status === 'completed';
    const isSoldOutOrEnded = isCompleted || isEventOver;

    return (
        <>
            {isFreeEvent || !hasTickets ? (
                <RedirectOrFetch user={user} route={`/events/toggle-like/${event.slug}`}>
                    <Button
                        size={"lg"}
                        disabled={isSoldOutOrEnded}
                        className="w-full rounded flex items-center gap-1.5"
                    >
                        <span>
                            {event.liked ? "Interest saved" : "Tap here to show interest"}
                        </span>
                        {event.liked ? (<RiHeartFill className="text-destructive" />) : (<RiHeartLine />)}

                    </Button>
                </RedirectOrFetch>
            ) : (
                isSoldOutOrEnded ? (
                    <Button
                        size={"lg"}
                        disabled
                        className="w-full"
                    >
                        {isEventOver ? 'Event Ended' : 'SOLD OUT'}
                    </Button>
                ) : (
                    <Link
                        to={`checkout#checkout`}
                        className="w-full block"
                    >
                        <Button
                            size={"lg"}
                            className="w-full transition-all relative"
                        >
                            Buy Ticket
                        </Button>
                    </Link>
                )
            )}
        </>
    );
}