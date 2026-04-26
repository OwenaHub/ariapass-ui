import { createCookieSessionStorage } from "react-router";

type SessionData = {
    user: User;
    token: string;
};

type SessionFlashData = {
    error: string;
    success: string;
};

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    // It is critical to have a secret in production to cryptographically sign the cookie
    console.warn("Missing SESSION_SECRET environment variable. Using a default fallback.");
}

export const sessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
        name: "__aria_pass_session",
        httpOnly: true, // Security: Prevents client-side JS from reading the cookie
        path: "/",
        sameSite: "lax",
        secrets: [SESSION_SECRET || "s3cr3t_f4llb4ck_k3y"], // Signs the cookie
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
    },
});

export const { getSession, commitSession, destroySession } = sessionStorage;