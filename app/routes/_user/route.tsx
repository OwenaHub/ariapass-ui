import { requireUser } from "~/lib/auth.server";
import type { Route } from "./+types/route";
import { SidebarLeft } from "~/components/sidebar-left"
import { SidebarRight } from "~/components/sidebar-right"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar"
import { Outlet } from "react-router";
import DefaultError from "~/components/custom/default-error";
import StatusModal from "~/components/custom/toaster/status-modal";
import PageName from "./page-name";

export async function loader({ request }: { request: Request }) {
    const user = await requireUser(request);
    return { user };
}

export default function UserLayout({ loaderData }: Route.ComponentProps) {
    const { user } = loaderData;

    return (
        <SidebarProvider>
            <SidebarLeft user={user} />
            <SidebarInset>
                <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <PageName />
                    </div>
                </header>
                <main>
                    <Outlet context={user} />
                </main>
            </SidebarInset>
            <SidebarRight />
            <StatusModal />
        </SidebarProvider>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    return <DefaultError error={error} />
}