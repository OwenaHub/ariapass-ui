import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/services/api-request";

export async function updateOrganiserProfile(
    request: Request,
    url: 'organiser-profile'
) {
    const req = new APIRequest(request);

    const credentials = await parseForm(request);
    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};

export async function getOrganiserProfile(
    request: Request,
    url: 'organiser-profile'
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};