import React from 'react'
import { Link, useFetcher } from 'react-router'
import { toast } from 'sonner';

export default function RedirectOrFetch({ children, route, user }:
    { children: React.ReactNode, route: string, user: User }
) {
    const fetcher = useFetcher();
    return (
        <>
            {user?.email
                ? (
                    <fetcher.Form method='POST' action={route}>
                        {children}
                    </fetcher.Form>
                )
                : (
                    <Link onClick={() => toast.info("Create an account to save this event")} to={"/register"}>
                        {children}
                    </Link>
                )
            }
        </>
    )
}
