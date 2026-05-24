import type { Route } from "../_user.account_.organiser-accounts.status.$profileId/+types/route";
import { updateOrganiserProfileStatus } from "~/handlers/organiser/accounts";
import { handleActionError } from "~/lib/logger.server";

export async function action({ params, request }: Route.ActionArgs) {
    try {
        await updateOrganiserProfileStatus(request, `admin/organiser-profiles/${params.profileId}`);
    } catch (error) {
        handleActionError(error);
        return null;
    }
}