import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/service/api-request";

export async function toggleInterest(
    request: Request,
    url: `events/${string}/interested`
) {
    const req = new APIRequest(request);
    return await req.post(`/api/${url}`, {});
};

export async function getEventProgram(
    request: Request,
    url: `events/${string}/program`
) {
    const req = new APIRequest(request);
    return await req.get(`/api/${url}`);
};

export async function postEventComment(
    request: Request,
    url: `events/${string}/reviews`
) {
    const credentials = await parseForm(request)
    const req = new APIRequest(request);
    return await req.post(`/api/${url}`, credentials);
};

export async function deleteEventComment(
    request: Request,
    url: `events/${string}/reviews/${string}`
) {
    const req = new APIRequest(request);
    return await req.delete(`/api/${url}`);
};

export async function editEventComment(
    request: Request,
    url: `events/${string}/reviews/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request)
    return await req.patch(`/api/${url}`, credentials);
}; 