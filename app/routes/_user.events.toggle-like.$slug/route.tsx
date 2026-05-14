import type { Route } from '../_user.events.toggle-like.$slug/+types/route'
import { redirect } from 'react-router';
import { withMsg } from '~/lib/redirector';
import { toggleInterest } from '~/handlers/user/misc';

export async function action({ request, params }: Route.ActionArgs) {
    try {
        await toggleInterest(request, `events/${params.slug}/interested`);
        return redirect(withMsg('', 'success', 'action_success'));
    } catch (error) {
        return redirect(withMsg('', 'error', 'action_failed'))
    }
}
