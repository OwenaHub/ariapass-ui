import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/services/api-request";

export default async function createEvent(
    request: Request,
    url: 'organiser/events'
) {
    const req = new APIRequest(request);

    const credentials = await parseForm(request);
    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};