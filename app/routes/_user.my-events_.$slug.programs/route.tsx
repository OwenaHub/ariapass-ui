import { parseForm } from "~/lib/utils";
import type { Route } from "../_user.my-events_.$slug.status/+types/route";
import { handleActionError } from "~/lib/logger.server";
import { redirect } from "react-router";
import { withMsg } from "~/lib/redirector";
import { createProgram, createProgramItem, deleteProgram, deleteProgramItem, editProgram, editProgramItem } from "~/handlers/organiser/event-program";

export async function action({ request, params }: Route.ActionArgs) {
    const credentials = await parseForm(request);

    try {
        switch (credentials.type) {
            case 'program.create':
                await createProgram(request, `organiser/events/${params.slug}/programs`);
                return;
            case 'program.edit':
                await editProgram(request, `organiser/events/${params.slug}/programs/${credentials.program_id}`)
                return
            case 'program.delete':
                await deleteProgram(request, `organiser/events/${params.slug}/programs/${credentials.program_id}`)
                return
            case 'program.item.create':
                await createProgramItem(request, `organiser/events/${params.slug}/programs/${credentials.program_id}/items`)
                return
            case 'program.item.update':
                await editProgramItem(request, `organiser/events/${params.slug}/programs/${credentials.program_id}/items/${credentials.item_id}`)
                return
            case 'program.item.delete':
                await deleteProgramItem(request, `organiser/events/${params.slug}/programs/${credentials.program_id}/items/${credentials.item_id}`)
                return;
            default:
                break;
        }
        return redirect(
            withMsg(`/my-events/${params.slug}`, 'success', 'action_success')
        )
    } catch (error) {
        handleActionError(error);
        return;
    }
}