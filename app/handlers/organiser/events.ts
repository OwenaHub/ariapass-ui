import { APIRequest } from "~/service/api-request";

export async function createEvent(
    request: Request,
    url: 'organiser/events'
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};

export async function updateEvent(
    request: Request,
    url: `organiser/events/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.patch(`/api/${url}`, credentials);

    return response;
};

export async function getOrganiserEvent(
    request: Request,
    url: `organiser/events/${string}`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};

export async function getOrganiserEvents(
    request: Request,
    url: 'organiser/events'
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};

export async function deleteOrganiserEvent(
    request: Request,
    url: `organiser/events/${string}`
) {
    const req = new APIRequest(request);
    const response: any = await req.delete(`/api/${url}`);

    return response;
};