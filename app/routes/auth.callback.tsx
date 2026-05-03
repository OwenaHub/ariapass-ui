import { redirect } from "react-router";
import { getSession, commitSession } from "~/services/session.server";
import type { Route } from "./+types/auth.callback";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token) {
        return redirect("/login?error=missing_token");
    }

    const session = await getSession(request.headers.get("Cookie"));

    session.set("token", token);

    return redirect("/home?default=welcome_home", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}