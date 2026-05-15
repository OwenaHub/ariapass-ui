import type { Route } from '../_user.events.toggle-like.$slug/+types/route'
import { redirect } from 'react-router';
import { withMsg } from '~/lib/redirector';
import { toggleInterest } from '~/handlers/user/misc';
import { handleActionError } from '~/lib/logger.server';

export async function action({ request, params }: Route.ActionArgs) {
    try {
        await toggleInterest(request, `events/${params.slug}/interested`);
        return;
    } catch (error) {
        handleActionError(error);
        return redirect(withMsg(`/events/${params.slug}`, 'error', 'action_failed'))
    }
}
