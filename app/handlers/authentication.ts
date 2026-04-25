import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/services/api-request";

export default async function authenticate(
    request: Request,
    url: 'login' | 'logout' | 'register' | 'forgot-password' | 'reset-password'
) {
    const req = new APIRequest(request);

    const credentials = await parseForm(request);
    const response = await req.post(`/api/${url}`, credentials);

    return response;
};