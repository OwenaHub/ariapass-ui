import { redirect } from "react-router";
import { API_URL, BASE_URL } from "~/config/defaults";
import { destroySession, getSession } from "~/services/session.server";

type FetchOptions = RequestInit & { params?: Record<string, string> };

export class ApiError extends Error {
    public status: number;
    public data: any;

    constructor(status: number, data: any) {
        super(data.message || "An API Error Occurred");
        this.status = status;
        this.data = data
        this.name = "ApiError";
    }
}

export class APIRequest {
    private request: Request;

    constructor(request: Request) {
        this.request = request;
    }

    private async requestBase<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const session = await getSession(this.request.headers.get("Cookie"));
        const token = session.get("accessToken");

        const url = new URL(`${API_URL}${endpoint}`);
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Referer": BASE_URL,
            ...(options.headers as Record<string, string>),
        });

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        const response = await fetch(url.toString(), {
            ...options,
            headers,
        });

        if (!response.ok) {
            await this.handleError(response);
        }

        if (response.status === 204) {
            return {} as T;
        }

        return response.json() as Promise<T>;
    }

    private async handleError(response: Response) {
        const status = response.status;

        if (status === 401 || status === 419) {
            const session = await getSession(this.request.headers.get("Cookie"));
            throw redirect("/login", {
                headers: {
                    "Set-Cookie": await destroySession(session)
                }
            });
        }

        if (status === 404) {
            throw new Response("Not Found", { status: 404 });
        }

        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: `Server returned non-JSON response (Status: ${status})` };
        }

        throw new ApiError(status, errorData);
    }

    public get<T>(endpoint: string, options?: FetchOptions) {
        return this.requestBase<T>(endpoint, { ...options, method: "GET" });
    }

    public post<T>(endpoint: string, body: any, options?: FetchOptions) {
        return this.requestBase<T>(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    public put<T>(endpoint: string, body: any, options?: FetchOptions) {
        return this.requestBase<T>(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    public delete<T>(endpoint: string, options?: FetchOptions) {
        return this.requestBase<T>(endpoint, { ...options, method: "DELETE" });
    }
}