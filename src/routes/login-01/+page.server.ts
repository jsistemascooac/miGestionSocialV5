import { loginAsociadoSchema } from '$lib/schema';
import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({params}) => {
    
	

	//console.log("Server:", request)
    return {
        form: await superValidate(zod(loginAsociadoSchema)),
		/*funcionalidad :params.funcionalidad,
		auxilios:  await pb.collection('gs_auxilios').getFullList<Auxilios>({
			sort: '-created',
			filter: `wf_auxilios_tipo = '7t26087ipu84j2d'`
				})*/
    };

}) satisfies PageServerLoad;