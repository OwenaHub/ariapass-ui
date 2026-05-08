import AddTicket from '../add-ticket'
import OrganiserTicketCard from '~/components/cards/organiser-ticket-card'
import EmptyState from '~/components/custom/empty-state'

export default function EventTickets({ event }: { event: OrganiserEvent }) {
    return (
        <div className="">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-50 rounded-2xl py-6 px-4">
                    {event.tickets.length ? (
                        <div className="flex flex-col gap-2">
                            {event.tickets.map(ticket => (
                                <OrganiserTicketCard ticket={ticket} key={ticket.id} />
                            ))}
                        </div>
                    ) : <EmptyState />}

                    <div className="mt-6">
                        <AddTicket event={event} />
                    </div>
                </div>
            </div>
        </div>
    )
}
