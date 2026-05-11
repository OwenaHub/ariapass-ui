import { Button } from "~/components/ui/button";
import dayjs from "dayjs";
import { STORAGE_URL } from "~/config/defaults";
import type { Route } from "../_user.my-events_.$slug/+types/route";
import { Link, redirect, useSearchParams, type MetaFunction } from "react-router";
import { parseForm } from "~/lib/utils";

import { defaultMeta } from '~/lib/meta';
import EventPublishedModal from "./event-published-modal";
import EventStatus from "~/components/custom/event-status";
import { RiCalendar2Line, RiMapLine, RiPencilLine, RiShareFill, RiTicketLine } from "@remixicon/react";
import { getOrganiserEvent } from "~/handlers/organiser/events";
import EventPlanBadge from "~/components/custom/event-plan-badge";
import { createEventTicket, deleteEventTicket, editEventTicket } from "~/handlers/organiser/tickets";
import { deleteEventMember } from "~/handlers/organiser/members";
import { handleActionError } from "~/lib/logger.server";
import Navigator from "./navigator";
import Overview from "./tabs/overview";
import EventTickets from "./tabs/event-tickets";
import EventMembers from "./tabs/event-members";
import { useEffect } from "react";

export const meta: MetaFunction = (args: any) => {
    if (!args.data.event) {
        return [{ title: "AriaPass - Discover the community behind the concerts" }];
    }
    return [
        ...(defaultMeta(args) || []),
        { title: `${args.data.event.title} | AriaPass Dashboard` },
    ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const res = await getOrganiserEvent(request, `organiser/events/${params.slug}`);
        return { event: res }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/my-events?error=action_failed')
    }
}

export async function action({ request, params }: Route.ActionArgs) {
    const credentials = await parseForm(request.clone());

    try {
        switch (credentials.type) {
            case 'ticket.edit':
                await editEventTicket(request, `${params.slug}/tickets/${credentials.ticket_id}`);
                return;
            case 'ticket.create':
                await createEventTicket(request, `${params.slug}/tickets`);
                return;
            case 'ticket.delete':
                await deleteEventTicket(request, `${params.slug}/tickets/${credentials.ticket_id}`)
                return;
            case 'member.delete':
                let permission = confirm('Do you want to delete this member?');
                if (permission) {
                    await deleteEventMember(request, `${params.slug}/members/${credentials.memberId}`)
                }
                return;
            default:
                break;
        };
        return redirect(`/my-events/${params.slug}?info=action_successful`)
    } catch (error: any) {
        handleActionError(error);
        return redirect("?warning=action_failed")
    }
}

export default function OrganiserEvent({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent } = loaderData;
    const [params, setParams] = useSearchParams();
    const FORMATTED_DATE = dayjs(event.date).format('MMMM D, YYYY');
    // ! const deviceStats = categorizeDevices(event.views as any[]);

    useEffect(() => {
        if (params.get("tab") === null) {
            setParams((prev) => {
                prev.set("tab", "overview");
                return prev;
            }, { replace: true });
        }
    }, [params, setParams]);

    return (
        <div className="py-10 container">
            <div className="mb-8 z-30">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex flex-col md:flex-row gap-5 items-start">
                        <div className="h-auto w-20 md:h-auto md:w-24 rounded overflow-hidden bg-gray-100 shrink-0 shadow-sm border border-gray-200">
                            {event.bannerUrl ? (
                                <img src={`${STORAGE_URL}/${event.bannerUrl}`} alt={event.title} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-300"><RiTicketLine /></div>
                            )}
                        </div>

                        <div>
                            <div className="flex md:flex-row flex-col md:items-center gap-3 mb-3">
                                <h1 className="text-2xl md:text-2xl font-bold tracking-tighter text-gray-900 leading-6">{event.title}</h1>
                                <EventPlanBadge tier={event.eventPlan?.tier} />
                            </div>
                            <p className="text-sm font-medium text-gray-500 flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-5">
                                <span className="flex items-center gap-1.5">
                                    <RiCalendar2Line className="size-4 hidden md:inline-block" /> {FORMATTED_DATE} at {event.startTime.substring(0, 5)}
                                </span>
                                <span className="md:hidden">•</span>
                                <span className="flex items-center gap-1.5 capitalize">
                                    <RiMapLine className="size-4 hidden md:inline-block" /> {event.venueName}, {event.city}
                                </span>
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <EventStatus status={event.status} date={event.date} startTime={event.startTime} />
                                <Link to="edit">
                                    <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-200 shadow-none">
                                        <RiPencilLine className="size-3.5" /> Edit Event
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        const shareData = {
                                            title: `See this event: ${event.title}`,
                                            text: event.description,
                                            url: `${window.location.origin}/events/${event.slug}`
                                        };
                                        navigator.share(shareData);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 border-gray-200 shadow-none">
                                    <RiShareFill className="size-3.5" /> Share link
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Navigator />

            <EventPublishedModal eventSlug={event.slug} />

            <main className="max-w-7xl mx-auto mt-5">
                {params.get("tab") === 'overview' && <Overview event={event} />}
                {params.get("tab") === 'members' && <EventMembers event={event} />}
                {params.get("tab") === 'tickets' && <EventTickets event={event} />}
            </main>
        </div>
    )
}