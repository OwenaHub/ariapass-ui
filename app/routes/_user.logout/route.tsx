import { redirect } from "react-router";
import authenticate from "~/handlers/authentication";
import { getSession, destroySession } from "~/services/session.server";
import type { Route } from "./+types/route";

export async function action({ request }: Route.ClientActionArgs) {
    try {
        await authenticate(request, 'logout');
    } catch (error) {
        console.error("Logout API failed, proceeding to clear local session.");
    }

    const session = await getSession(request.headers.get("Cookie"));

    return redirect("/login?logged_out=true", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}