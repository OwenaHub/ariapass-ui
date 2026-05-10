import { redirect } from "react-router";
import { getSession } from "~/session.server";
import { APIRequest } from "~/service/api-request";

export async function requireUser(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");

    if (!token) {
        throw redirect("/login");
    }

    const res = new APIRequest(request);
    const user = await res.get<User>('/api/user');

    return user;
}

export async function requireGuest(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");

    if (token) {
        throw redirect("/home");
    }

    return null;
}