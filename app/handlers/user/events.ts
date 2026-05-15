import { APIRequest } from "~/service/api-request";

export async function getGuestEvents(
    request: Request,
    url: `events`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};

export async function getGuestEvent(
    request: Request,
    url: `events/${string}`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};

export async function getGuestSavedEvents(
    request: Request,
    url: `events/favourites`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};