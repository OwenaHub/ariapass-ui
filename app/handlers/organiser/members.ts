import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/service/api-request";

export async function deleteEventMember(
    request: Request,
    url: `organiser/events/${string}/members/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.delete(`/api/${url}`, credentials);

    return response;
};

export async function createEventMember(
    request: Request,
    url: `organiser/events/${string}/members`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};