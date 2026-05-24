import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/service/api-request";

export async function getOrganiserProfiles(
    request: Request,
    url: `admin/organiser-profiles`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};

export async function updateOrganiserProfileStatus(
    request: Request,
    url: `admin/organiser-profiles/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await parseForm(request);
    const response: any = await req.patch(`/api/${url}`, credentials);

    return response;
};