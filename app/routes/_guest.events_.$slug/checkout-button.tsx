import { RiHeartLine } from "@remixicon/react";
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
            {isFreeEvent ? (
                <RedirectOrFetch user={user} route={`/events/toggle-like/${event.slug}`}>
                    <Button
                        disabled={isSoldOutOrEnded}
                        className="bg-primary w-full py-6 text-lg font-light rounded-lg tracking-tighter gap-2"
                    >
                        <span>I will attend</span>
                        <RiHeartLine
                            size={20}
                            className={event.liked ? 'text-destructive fill-current' : ''}
                        />
                    </Button>
                </RedirectOrFetch>
            ) : (
                isSoldOutOrEnded ? (
                    <Button
                        disabled
                        className="bg-gray-300 border-none w-full text-gray-500 cursor-not-allowed"
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