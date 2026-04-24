import { redirect } from "react-router";
import { toast } from "sonner";
import type { Route } from "../_user.logout/+types/route";
import authenticate from "~/handlers/authentication";

export async function clientAction({ request }: Route.ClientActionArgs) {
    // const req = await authenticate(request, 'logout');

    toast.promise(async () => await authenticate(request, 'logout'), {
        loading: 'Processing request',
        success: 'You have logged out!',
        error: 'Failed to log out. Please try again.',
    });

    return redirect('/login');
}