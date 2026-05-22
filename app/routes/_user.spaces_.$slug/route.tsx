import type { Route } from "../_user.spaces_.$slug/+types/route";
import { redirect } from "react-router";
import PurchasesTable from "./purchase-table";
import { handleActionError } from "~/lib/logger.server";
import { getOrganiserEvent } from "~/handlers/organiser/events";
import { Text } from "~/components/ui/text";


export async function loader({ params, request }: Route.LoaderArgs) {
    try {
        const res = await getOrganiserEvent(request, `organiser/events/${params.slug}`);
        return { space: res }
    } catch (error: any) {
        handleActionError(error)
        return redirect('/my-events?error=action_failed')
    }
}

export default function EventSpaces({ loaderData }: Route.ComponentProps) {
    const { space }: { space: OrganiserEvent } = loaderData;

    return (
        <div className="container">
            {/* Header */}
            <section className="mx-auto">
                <Text.p className="text-gray-500 text-sm">
                    {space.tickets.reduce((sum, ticket) => sum + ticket.ticketPurchases, 0)} Guests
                </Text.p>
                <Text.h1>
                    {space.title}
                </Text.h1>
            </section>

            <section>
                <PurchasesTable event={space} />
            </section>
        </div >
    )
}
