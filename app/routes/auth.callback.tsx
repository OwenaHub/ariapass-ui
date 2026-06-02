import { redirect } from "react-router";
import { getSession, commitSession } from "~/session.server";
import type { Route } from "./+types/auth.callback";
import { withMsg } from "~/lib/redirector";
import { requireUser } from "~/lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
        return redirect(withMsg('/login', 'error', 'action_failed'));
    }

    const session = await getSession(request.headers.get("Cookie"));
    session.set("token", token);

    const fakeCookieString = await commitSession(session);

    const authHeaders = new Headers(request.headers);
    authHeaders.set("Cookie", fakeCookieString);
    const tempRequest = new Request(request.url, { headers: authHeaders });

    let user;
    try {
        user = await requireUser(tempRequest);
    } catch (error) {
        console.error("Failed to fetch user profile via requireUser", error);
        return redirect(withMsg('/login', 'error', 'action_failed'));
    }

    session.set("user", user);

    return redirect(
        withMsg('/home', 'default', 'welcome_home'), {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}