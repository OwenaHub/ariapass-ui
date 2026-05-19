import { redirect } from "react-router";
import type { Route } from "../_user.my-events.members/+types/route";
import { parseForm } from "~/lib/utils";
import { handleActionError } from "~/lib/logger.server";
import { withMsg } from "~/lib/redirector";
import { createEventMember } from "~/handlers/organiser/members";

export async function action({ request }: Route.ClientActionArgs) {
    const credentials = await parseForm(request);

    try {
        await createEventMember(request, `organiser/events/${credentials.event_slug}/members`);
    } catch (error) {
        handleActionError(error);
        return redirect(
            withMsg(`/my-events/${credentials.event_slug}`, 'error', 'action_failed')
        )
    }

    return redirect(
        withMsg(`/my-events/${credentials.event_slug}?tab=collaborators`, 'success', 'action_success')
    );
}