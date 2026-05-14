import React from 'react'
import { Link, useFetcher } from 'react-router'

export default function RedirectOrFetch({ children, route, user }:
    { children: React.ReactNode, route: string, user: User }
) {
    const fetcher = useFetcher();
    return (
        <>
            {user.email
                ? (
                    <fetcher.Form method='POST' action={route}>
                        {children}
                    </fetcher.Form>
                )
                : (<Link to={"/register"}>{children}</Link>)
            }
        </>
    )
}
