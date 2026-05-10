import { ApiError } from "~/service/api-request";

export function handleActionError(error: unknown) {
    if (error instanceof ApiError) {
        console.log("\n🔥 --- API ERROR --- 🔥");
        console.log(`Status: ${error.status}`);
        console.dir(error, { depth: null });
        console.log("-------------------------------\n");

        return {
            status: error.status,
            errors: error.data?.errors || null,
            message: error.data?.message || "An API error occurred.",
        };
    }

    if (error instanceof Error) {
        console.log("🚨 Network/Native Error:", error.message);
        return {
            errors: null,
            message: error.message,
        };
    }

    console.log("⚠️ Unknown Error:", error);
    return {
        errors: null,
        message: "An unknown error occurred.",
    };
}