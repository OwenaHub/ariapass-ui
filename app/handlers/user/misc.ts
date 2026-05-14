import { APIRequest } from "~/service/api-request";

export async function toggleInterest(
    request: Request,
    url: `events/${string}/interested`
) {
    const req = new APIRequest(request);
    return await req.get(`/api/${url}`);
}; 