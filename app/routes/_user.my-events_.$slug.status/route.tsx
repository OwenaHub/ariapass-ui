import type { Route } from '../_user.my-events_.$slug.status/+types/route';
import { redirect } from 'react-router';
import { withMsg } from '~/lib/redirector';
import { parseForm } from '~/lib/utils';
import { APIRequest } from '~/service/api-request';

export async function action({ params, request }: Route.ClientActionArgs) {
    const data = await parseForm(request);
    const res = new APIRequest(request);

    try {
        const organiserEvent: OrganiserEvent = await res.patch(`/api/organiser/events/${params.slug}/status`, data);
        if (organiserEvent.status === 'published') {
            // do not change this, there is a special popup for that
            return redirect(`/my-events/${params.slug}?status=published`);
        } else {
            return redirect(
                withMsg(`/my-events/${params.slug}`, 'info', 'action_success')
            );
        }
    } catch (error: any) {
        if (error.status === 401) {
            return redirect('/login');
        }
    }
    return null;
}
