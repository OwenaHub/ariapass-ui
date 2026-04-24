import { parseForm } from "~/lib/utils";
import { APIRequest } from "~/services/api-request";

export default async function authenticate(
    request: Request,
    url: 'login' | 'logout' | 'register' | 'forgot-password' | 'reset-password'
) {
    const req = new APIRequest(request);

    const formData = new FormData();

    const credentials = await parseForm(request);

    for (const key in credentials)
        formData.append(key, credentials[key]);

    const response = await req.post(`/api/${url}`, formData);
    
    console.log(response);
    
    return response;
};  