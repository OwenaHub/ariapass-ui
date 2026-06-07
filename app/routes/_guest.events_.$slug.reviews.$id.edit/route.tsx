// import client from "~/http/client";
import type { Route } from "../_guest.events_.$slug.reviews.$id.edit/+types/route";
import { redirect } from "react-router";
import { withMsg } from "~/lib/redirector";
import { handleActionError } from "~/lib/logger.server";
import { editEventComment } from "~/handlers/user/misc";

export async function action({ params, request }: Route.ActionArgs) {
    try {
        await editEventComment(request, `events/${params.slug}/reviews/${params.id}`);
        return redirect(withMsg(`/events/${params.slug}#comments`, 'success', 'action_success'))
    } catch (error) {
        handleActionError(error);
        return redirect(withMsg(`/events/${params.slug}#comments`, 'error', 'action_failed'))
    }
}