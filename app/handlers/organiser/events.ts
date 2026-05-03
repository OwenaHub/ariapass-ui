import { APIRequest } from "~/services/api-request";

export async function createEvent(
    request: Request,
    url: 'organiser/events'
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};

export async function getEvents(
    request: Request,
    url: 'organiser/events'
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};