import { redirect } from "react-router";
import authenticate from "~/handlers/authentication";
import { getSession, destroySession } from "~/session.server";
import type { Route } from "./+types/route";
import { handleActionError } from "~/lib/logger.server";

export async function action({ request }: Route.ClientActionArgs) {
    try {
        await authenticate(request, 'logout');
    } catch (error) {
        handleActionError(error);
    }

    const session = await getSession(request.headers.get("Cookie"));

    return redirect("/login?logged_out=true", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}