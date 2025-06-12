import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async  ({ params, locals: { pb, user } }) => {
        const userId = user?.id;
        if (!userId) {
            redirect(308, '/');
        } 
    return {};
}) satisfies LayoutServerLoad;