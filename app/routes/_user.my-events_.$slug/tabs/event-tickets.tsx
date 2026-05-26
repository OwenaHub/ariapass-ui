import { Link } from 'react-router'
import AddTicket from '../add-ticket'
import OrganiserTicketCard from '~/components/cards/organiser-ticket-card'
import { SmallEmptyState } from '~/components/custom/empty-state'
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
                        <Text.small>
                            Go to {" "}
                            <Link to={"?tab=overview"} className='underline underline-offset-1'>overview</Link> {" "}
                            to see and change this events status
                        </Text.small>
                    </div>
                )}
            </section>

            <div className="lg:col-span-2 space-y-8">
                <div className="">
                    {event.tickets.length ? (
                        <div className="flex flex-col gap-2">
                            {event.tickets.map(ticket => (
                                <OrganiserTicketCard ticket={ticket} key={ticket.id} />
                            ))}
                        </div>
                    ) : <SmallEmptyState title='No tickets added' />}

                    <div className="mt-6">
                        <AddTicket event={event} />
                    </div>
                </div>
            </div>
        </div>
    )
}
