import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/service/api-request";

export async function deleteEventMember(
    request: Request,
    url: `${string}/members/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.post(`/api/organiser/events/${url}`, credentials);

    return response;
};