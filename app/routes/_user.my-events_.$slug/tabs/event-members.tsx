import NewTeammate from '~/components/utility/new-teammate'
import MembersTable from '../members-table'
import { SmallEmptyState } from '~/components/custom/empty-state'

export default function EventMembers({ event }: { event: OrganiserEvent }) {
    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="">
                {event.members?.length ? (
                    <MembersTable members={event.members} />
                ) : <SmallEmptyState />}

                <div className="mt-6">
                    <NewTeammate events={[event]} />
                </div>
            </div>
        </div>
    )
}
