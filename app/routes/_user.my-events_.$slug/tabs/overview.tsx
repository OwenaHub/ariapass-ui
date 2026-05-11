import { RiArrowRightLine, RiHeartFill, RiMessage3Fill } from '@remixicon/react';
import { Link } from 'react-router';
import FormatPrice from '~/components/utility/format-price';
import UpdateEventStatus from '../update-event-status';

export default function Overview({ event }: { event: OrganiserEvent }) {
    const TOTAL_TICKETS = event.tickets.reduce((sum, ticket) => sum + ticket.quantityAvailable, 0);
    const TOTAL_TICKET_SOLD = event.tickets.reduce((sum, ticket) => sum + ticket.ticketPurchases, 0);
    const SUM_AMOUNT = event.tickets.flatMap(t => t.purchases || []).reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    return (
        <div>
            <UpdateEventStatus event={event} />

            {(event.status === 'published' || event.tickets.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 my-8">
                    {/* Revenue Card */}
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-400 mb-3 flex items-center justify-between">
                            <span className="text-primary">Revenue</span>
                            <Link to={`/spaces/${event.slug}`}>
                                <RiArrowRightLine strokeWidth={3} className="size-4 text-primary transition-colors" />
                            </Link>
                        </p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tighter">
                            <span className="text-lg text-gray-400 font-normal mr-1">₦</span>
                            <FormatPrice withSymbol={false} price={SUM_AMOUNT.toFixed(2)} />
                        </p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-xs text-primary mb-3">Page Views</p>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-bold text-gray-900 tracking-tighter">{typeof event.views === 'object' ? event.views.length : 0}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-xs text-primary mb-3">Tickets Sold</p>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-3xl font-bold text-gray-900 tracking-tighter">
                                {TOTAL_TICKET_SOLD}
                                <span className="text-xl font-normal text-gray-400">/{TOTAL_TICKETS}</span>
                            </p>
                            <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
                                {event.tickets.length} tier{event.tickets.length > 1 && 's'}
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-white border rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${TOTAL_TICKETS > 0 ? (TOTAL_TICKET_SOLD / TOTAL_TICKETS) * 100 : 0}%` }} />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-xs text-primary mb-3">Engagement</p>
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">{event.likes || "0"} <RiHeartFill className="size-4 text-pink-500" /></p>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Likes</span>
                            </div>
                            <div className="h-8 w-px bg-gray-100" />
                            <div>
                                <p className="text-3xl font-bold text-gray-900 flex items-center gap-2">{event.reviews?.length || 0} <RiMessage3Fill className="size-4 text-indigo-500" /></p>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Comments</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
