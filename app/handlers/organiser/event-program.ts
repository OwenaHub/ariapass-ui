import { APIRequest } from "~/service/api-request";

export async function createProgram(
    request: Request,
    url: `organiser/events/${string}/programs`
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};

export async function editProgram(
    request: Request,
    url: `organiser/events/${string}/programs/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.patch(`/api/${url}`, credentials);

    return response;
};

export async function deleteProgram(
    request: Request,
    url: `organiser/events/${string}/programs/${string}`
) {
    const req = new APIRequest(request);

    const response: any = await req.delete(`/api/${url}`);

    return response;
};

export async function createProgramItem(
    request: Request,
    url: `organiser/events/${string}/programs/${string}/items`
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.post(`/api/${url}`, credentials);

    return response;
};

export async function editProgramItem(
    request: Request,
    url: `organiser/events/${string}/programs/${string}/items/${string}`
) {
    const req = new APIRequest(request);
    const credentials = await request.formData();

    const response: any = await req.patch(`/api/${url}`, credentials);

    return response;
};

export async function deleteProgramItem(
    request: Request,
    url: `organiser/events/${string}/programs/${string}/items/${string}`
) {
    const req = new APIRequest(request);
    const response: any = await req.delete(`/api/${url}`);

    return response;
};

