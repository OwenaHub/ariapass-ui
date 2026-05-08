import NewTeammate from '~/components/utility/new-teammate'
import MembersTable from '../members-table'
import EmptyState from '~/components/custom/empty-state'

export default function EventMembers({ event }: { event: OrganiserEvent }) {
    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 py-6 px-4 h-full">
                {event.members?.length ? (
                    <MembersTable members={event.members} />
                ) : <EmptyState />}

                <div className="mt-6">
                    <NewTeammate events={[event]} />
                </div>
            </div>
        </div>
    )
}
