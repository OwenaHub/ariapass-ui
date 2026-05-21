import type { Route } from '../_guest.events_.$slug_.checkout/+types/route';
import { redirect, useOutletContext, type MetaFunction } from 'react-router';
import { useState } from 'react';
import PaystackPurchaseButton from './paystack-purchase-button.client';
import { Button } from '~/components/ui/button';
import FormatPrice from '~/components/utility/format-price';
import { STORAGE_URL } from '~/config/defaults';
import { isPastEventDate } from '~/lib/utils';
import { RiArrowLeftLine, RiArrowRightLine, RiCheckFill } from '@remixicon/react';
import { getGuestEvent } from '~/handlers/user/events';
import { withMsg } from '~/lib/redirector';
import { handleActionError } from '~/lib/logger.server';
import { APIRequest } from '~/service/api-request';
import { commitSession, getSession } from '~/session.server';

export const meta: MetaFunction = ({ data }: any) => {
  if (!data.event) {
    return [
      { title: "AriaPass - Discover the community behind the concerts" },
      { name: "description", content: "Discover the community behind the concerts" },
    ];
  }
  const event: OrganiserEvent = data.event;

  return [
    // Standard Meta Tags
    { title: `${event.title} | AriaPass` },
    { name: "description", content: event.description || "Discover the community behind the concerts" },
    { name: "theme-color", content: "#625DF5" },
    { name: "keywords", content: "concert community, music events, fan meetups, social ticketing, event organization, AriaPass, OwenaHub" },
    { name: "author", content: "OwenaHub Collective" },
    { name: "robots", content: "index, follow" },

    // Open Graph (Facebook, LinkedIn)
    { property: "og:title", content: `${event.title} | AriaPass` },
    { property: "og:description", content: event.description || "Discover the community behind the concerts" },
    { property: "og:image", content: `https://api.ariapass.africa/storage/banners/${event.bannerUrl}` },
    { property: "og:url", content: "https://api.ariapass.africa" },
    { property: "og:type", content: "website" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@owenahub" }, // Optional: Add your Twitter handle
    { name: "twitter:title", content: `${event.title} | AriaPass` },
    { name: "twitter:description", content: event.description || "Discover the community behind the concerts" },
    { name: "twitter:image", content: `https://api.ariapass.africa/storage/banners/${event.bannerUrl}` },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const event: OrganiserEvent = await getGuestEvent(request, `events/${params.slug}`);

        if (isPastEventDate(event.date, event.startTime)
            || event.tickets.length === 0
            || event.status !== 'published') {
            return redirect(withMsg(`/events/${params.slug}`, 'info', 'action_failed'));
        }

        return { event };
    } catch (error: any) {
        handleActionError(error);
        return redirect(withMsg('/home', 'error', 'action_failed'));
    }
}

export async function action({ request }: Route.ActionArgs) {
    try {
        const req = new APIRequest(request);

        const data = await request.json();

        const response: any = await req.post(`/api/tickets/purchases/${data.ticket_id}`, {
            reference: data.reference,
            currency: "NGN",
            payment_method: "paystack",
            purchaser_name: data.purchaser_name,
            purchaser_email: data.purchaser_email,
            quantity: data.quantity,
            tickets: data.tickets,
        });

        const token = response?.auth_token;
        const user = response?.user;

        const headers = new Headers();

        if (token) {
            const session = await getSession(request.headers.get("Cookie"));
            session.set("token", token);
            session.set("user", user);
            headers.append("Set-Cookie", await commitSession(session));
        }

        return redirect(
            withMsg(`/tickets?reference=${data.reference}&message=Approved`, 'success', 'ticket_purchased'), {
            headers
        });

    } catch (error: any) {
        handleActionError(error);

        return {
            error: error.response?.data?.error || "Payment verification failed. Please contact support."
        };
    }
}

export default function EventCheckout({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent } = loaderData;
    const user: User = useOutletContext();

    const [ticket, setTicket] = useState<Ticket>(event.tickets[0]);
    const [next, setNext] = useState(false);

    let banner = event.bannerUrl
        ? `${STORAGE_URL}/${event.bannerUrl}`
        : "/images/banners/default-course-img.png";

    return (
        <div className='lg:px-14'>
            <section className='container flex flex-col md:flex-row md:items-start py-10 md:gap-20 gap-10'>
                <div className="bg-white max-w-lg shadow-xl overflow-hidden relative hidden md:block">
                    <img
                        src={banner}
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />

                    <div className="bg-white/60 border px-4 py-2 text-sm font-semibold rounded-md absolute top-5 left-5">
                        {event.eventType}
                    </div>

                    {event.status === 'completed' && (
                        <div className='bg-gray-800 font-bold text-white text-xs px-3 py-3 rounded-md w-max mb-1 absolute bottom-5 left-5'>
                            {isPastEventDate(event.date, event.startTime) ? 'EVENT ENDED' : 'SOLD OUT'}
                        </div>
                    )}
                </div>

                <div className='flex-1'>
                    <div className="mb-5">
                        <p className='text-gray-500 text-sm tracking-tighter'>Ticket checkout</p>
                        <h1 className='font-bold text-xl tracking-tighter'>
                            {event.title}
                        </h1>
                    </div>
                    {next && (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="w-max mb-5"
                            onClick={() => setNext(false)}
                        >
                            <RiArrowLeftLine /> Back
                        </Button>
                    )}

                    {!next && (
                        <>
                            {event.tickets.map((item: Ticket) => (
                                <div
                                    key={item.id}
                                    onClick={() => setTicket(item)}
                                    className={`border bg-white rounded cursor-pointer px-4 py-4 mb-5 flex items-center justify-between 
                                    ${item.id === ticket?.id && 'outline-2 outline-theme outline-offset-2 text-theme bg-indigo-50!'} relative
                                    `}
                                >
                                    <div>
                                        <small className="flex gap-1 items-center font-semibold">
                                            <span>{item.name} ticket</span>
                                            {item.quantityAvailable - item.ticketPurchases <= 0 && (
                                                <span className="bg-amber-400 text-white px-2 py-0.5 tracking-tighter text-xs rounded-lg">SOLD OUT</span>
                                            )}
                                        </small>

                                        <p className="font-semibold">
                                            <FormatPrice price={item.price} />
                                        </p>
                                    </div>
                                    {(item.id === ticket.id) && (
                                        <RiCheckFill className='text-theme' />
                                    )}
                                </div>
                            ))}

                            <br />

                            <Button
                                className="w-full"
                                size={"lg"}
                                disabled={!ticket || (ticket.quantityAvailable - ticket.ticketPurchases <= 0)}
                                onClick={() => setNext(!next)}
                            >
                                Continue <RiArrowRightLine />
                            </Button>
                        </>
                    )}

                    {next && (
                        <PaystackPurchaseButton
                            user={user}
                            organiser={event.organiser as OrganiseProfile}
                            ticket={ticket}
                        />
                    )}
                    <p className="text-[10px] tracking-wide text-gray-400 text-center mt-5 uppercase justify-center items-center flex">
                        Secure payment with <img src="/images/logos/paystack.png" alt="Paystack Logo" className="size-3 inline-block mx-1" /> Paystack
                    </p>
                </div>
            </section>

            <section className='container my-8'>
                {/* {(event.eventProgram && event.eventProgram?.length > 0) && (
                    <div>
                        <ViewEventProgram event={event} />
                    </div>
                )} */}
            </section>
        </div>
    )
}