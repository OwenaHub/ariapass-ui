import type { Route } from '../_user.my-events_.$slug.status/+types/route';
import { redirect } from 'react-router';
import { parseForm } from '~/lib/utils';
import { APIRequest } from '~/services/api-request';

export async function action({ params, request }: Route.ClientActionArgs) {
    const data = await parseForm(request);
    const res = new APIRequest(request);

    try {
        const _res = await res.patch(`/api/organiser/events/${params.slug}/status`, data);
        console.log(_res);
        return redirect(`/my-events/${params.slug}/?default=action_successful`);
    } catch (error: any) {
        if (error.status === 401) {
            return redirect('/login');
        }
    }
    return null;
}
