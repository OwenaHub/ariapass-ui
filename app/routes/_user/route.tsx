import { requireUser } from "~/lib/auth.server";
import type { Route } from "./+types/route";
import { SidebarLeft } from "~/components/sidebar-left"
import { SidebarRight } from "~/components/sidebar-right"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar"
import { Outlet } from "react-router";

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
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        Project Management & Task Tracking
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    )
}
