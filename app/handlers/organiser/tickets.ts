import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/service/api-request";

export async function editEventTicket(
    request: Request,
    url: `${string}/tickets/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.patch(`/api/organiser/events/${url}`, credentials);

    return response;
};

export async function createEventTicket(
    request: Request,
    url: `${string}/tickets`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.post(`/api/organiser/events/${url}`, credentials);

    return response;
};

export async function deleteEventTicket(
    request: Request,
    url: `${string}/tickets/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.delete(`/api/organiser/events/${url}`, credentials);

    return response;
};