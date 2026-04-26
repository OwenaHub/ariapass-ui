import { Outlet } from 'react-router'
import { requireGuest } from '~/lib/auth.server';
import type { Route } from './+types/route';

export async function loader({ request }: Route.LoaderArgs) {
    await requireGuest(request);
    return null;
}

export default function AuthLayout() {

    return (
        <div className='h-screen'>
            <Outlet />
        </div>
    )
}
