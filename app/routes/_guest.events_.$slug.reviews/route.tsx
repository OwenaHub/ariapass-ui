import type { Route } from "../_guest.events_.$slug.reviews/+types/route";
import { redirect } from "react-router";
import { handleActionError } from "~/lib/logger.server";
import { withMsg } from "~/lib/redirector";
import { postEventComment } from "~/handlers/user/misc";

export async function action({ params, request }: Route.ActionArgs) {
    try {
        await postEventComment(request, `events/${params.slug}/reviews`);
        return redirect(withMsg(`/events/${params.slug}#comments`, 'success', 'action_success'))
    } catch (error) {
        handleActionError(error);
        return redirect(withMsg(`/events/${params.slug}#comments`, 'error', 'action_failed'))
    }
}