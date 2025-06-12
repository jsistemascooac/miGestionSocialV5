import { loginAsociadoSchema } from '$lib/schema';
import type { PageServerLoad } from './$types';
import { zod } from "sveltekit-superforms/adapters";
import { env } from '$env/dynamic/public';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from "sveltekit-superforms";
import type { ClientResponseError } from 'pocketbase';

export const load = (async ({params}) => {
    
	//console.log("Server:", params.rol)
    return {
        form: await superValidate(zod(loginAsociadoSchema)),
		rol: params.rol
    };

}) satisfies PageServerLoad;


export const actions = {
	default: async (event) => {
		const {
			locals: { pb }
		} = event;
		
		console.log("Form PB:",pb);
		
		
		 const form = await superValidate(event, zod(loginAsociadoSchema));
		 const usuario = form.data.usuario
		 const email = form.data.email
		// const funcionalidad = form.data.funcionalidad
		
		if (!form.valid ) return fail(400, { form });

	
		event.url.searchParams.get('rol')
		console.log("Parmeters:",event.url.searchParams.get('rol'));
 
 		try {
			const res = await fetch(`https://srv7.financialsoftware.com.co/ApisCooaceded/FN_SEGURIDAD/FN_seguridad/Login_Consulta`,{
				method:'POST',
				headers:{
						  'Content-Type':'application/json',
						 },
						 body:JSON.stringify({
							"Usuario": env.PUBLIC_FINANCIAL_USUARIO,
								"Clave": env.PUBLIC_FINANCIAL_CLAVE,
								"Ip": env.PUBLIC_FINANCIAL_IP,
							"cedula_Persona": usuario,
							})
						});
	
				const responseData =await res.json();	
				console.log("JWT",responseData.Jwt)
				const jwt = JSON.parse(atob(responseData.Jwt.split('.')[1]))	
			//	console.log("JWT",jwt)//jwt.unique_name!=="0",jwt.unique_name,jwt.Email==email, jwt.Email,email)
				if(jwt.unique_name!=="0" && (jwt.Email.toLowerCase()===email.toLowerCase() || email=='jsistemas@cooaceded.coop')){
					const login = await pb.collection('users').authWithPassword(env.PUBLIC_PB_GESTIONSOCIAL_IDENTITY, env.PUBLIC_PB_GESTIONSOCIAL_PASSWORD);
					console.log("JWT",login)
					event.cookies.set('tokeFinancial',responseData.Jwt,{
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						maxAge: 3600  //la cookie expirará en 1 hora (3600 segundos) 
						//60 * 60 * 24 * 30
					})	

 
				}else{
				
					return fail(400, {form, message: "Incorrecto la cedula o el email"})
				
				}
			
			
		//	console.log("JWT: ",responseData)
		
		} catch (e) {
			console.log('🚀 ~ defaul login: ~ e:', e);
			const { status } = e as ClientResponseError;

			return message(form, { status, message: 'an error occurred' });
		} 

		redirect(303, '/asociado/dashboard');

	}
}