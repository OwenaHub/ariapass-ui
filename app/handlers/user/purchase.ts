import { APIRequest } from "~/service/api-request";

export async function getTicketPurchases(
    request: Request,
    url: `tickets/purchases`
) {
    const req = new APIRequest(request);
    const response: any = await req.get(`/api/${url}`);

    return response;
};