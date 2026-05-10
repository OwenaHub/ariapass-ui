import { redirect } from "react-router";
import { getSession, commitSession } from "~/session.server";
import type { Route } from "./+types/auth.callback";
import { withMsg } from "~/lib/redirector";
import { msg } from "~/components/custom/toaster/dictionary";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
        return redirect(withMsg('/login', 'error', msg.general.actionFailed));
    }

    const session = await getSession(request.headers.get("Cookie"));

    session.set("token", token);

    return redirect("/home?default=welcome_home", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}