import { Link } from 'react-router'
import AddTicket from '../add-ticket'
import OrganiserTicketCard from '~/components/cards/organiser-ticket-card'
import EmptyState from '~/components/custom/empty-state'
import { Text } from '~/components/ui/text'

export default function EventTickets({ event }: { event: OrganiserEvent }) {
    return (
        <div>
            <section className="mb-4">
                {event.status === 'draft' && (
                    <div className="p-2 text-xs bg-amber-50 text-amber-900">
                        <Text.small className='mb-0.5 font-bold'>
                            This event is not yet published
                        </Text.small>
                        {event.tickets.length > 0 && (
                            <Text.small>
                                Click on {" "}
                                <Link to={"?tab=overview"} className='underline underline-offset-1'>overview</Link> {" "}
                                to see and change this events status
                            </Text.small>
                        )}
                    </div>
                )}
            </section>

            <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-50 rounded-2xl py-6 px-4">
                    {event.tickets.length ? (
                        <div className="flex flex-col gap-2">
                            {event.tickets.map(ticket => (
                                <OrganiserTicketCard ticket={ticket} key={ticket.id} />
                            ))}
                        </div>
                    ) : <EmptyState title='No tickets added' description="If this is a free event, add a ticket title 'FREE ENTRY', and give it price of 0" />}

                    <div className="mt-6">
                        <AddTicket event={event} />
                    </div>
                </div>
            </div>
        </div>
    )
}
