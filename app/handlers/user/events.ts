import { APIRequest } from "~/service/api-request";

export async function getGuestEvents(
    request: Request,
    url: `events`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};