import { APIRequest } from "~/service/api-request"

export async function getBankList(
    request: Request,
    params: {
        country?: string;
        currency?: string;
        perPage?: number;
        page?: number;
    } = {}
) {
    const req = new APIRequest(request);

    const query: Record<string, string> = Object.fromEntries(
        Object.entries(params)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    );

    const response: any = await req.get('/api/organiser-profile/banks', {
        params: Object.keys(query).length > 0 ? query : undefined
    });

    return response.data;
}

export async function verifyAccount(request: Request, params: {
    accountNumber: string
    bankCode: string
}) {
    const req = new APIRequest(request)
    const res = await req.post('/api/organiser-profile/resolve-account', params);
    return res;
}
