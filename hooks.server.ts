// src/hooks.server.js
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    const {locals,request,url} = event
    //const cookieTheme = event.cookies.get('theme');
  //  console.log("theme 222",cookieTheme)	
   
    
		


   // locals.tokeFinancial=''
    locals.pb = new PocketBase(env.PUBLIC_PB_LOCAL_IP);

    // load the store data from the request cookie string
    locals.pb.authStore.loadFromCookie(request.headers.get('cookie') || '');
   // console.log("token PBXYZ",locals.user,locals.tokeFinancial)	
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        locals.pb.authStore.isValid && await locals.pb.collection('users').authRefresh();
        locals.user = locals.pb.authStore.model
       
/* 
        const res = await fetch(`https://srv7.financialsoftware.com.co/ApisCooaceded/FN_SEGURIDAD/FN_seguridad/Login_Consulta`,{
            method:'POST',
            headers:{
                      'Content-Type':'application/json',
                     },
                     body:JSON.stringify({
                        "Usuario": env.PUBLIC_FINANCIAL_USUARIO,
                            "Clave": env.PUBLIC_FINANCIAL_CLAVE,
                            "Ip": env.PUBLIC_FINANCIAL_IP,
                        "cedula_Persona": cookieTheme,
                        })
                    });

            const responseData =await res.json();	*/
            
            locals.tokeFinancial =  event.cookies.get('tokeFinancial');
            locals.estadoFinancial =  event.cookies.get('estadoFinancial');
            //event.cookies.delete("tokeFinancial", { path: "/" });
        
            if(locals.tokeFinancial){
              
                
                    
                    if (event.locals.pb.authStore.isValid) {
                        event.locals.user = event.locals.pb.authStore.model;
                    } else {
                        event.locals.user = undefined;
                    }
                
                   // global.EventSource = eventsource;
                    
                    const response = await resolve(event);
                
                    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
                  /*   const resLoginPB = await fetch(`http://10.100.1.2:3090/api/collections/users/auth-with-password`,{
                        method:'POST',
                        headers:{
                                'Content-Type':'application/json',
                                },
                                body:JSON.stringify({
                                    "identity": env.PUBLIC_PB_GESTIONSOCIAL_IDENTITY,
                                    "password": env.PUBLIC_PB_GESTIONSOCIAL_PASSWORD,
                                    
                                    })
                                });

                        const response =await resLoginPB.json();	
                //     console.log("token PBXYZ",response.token)	
                        locals.tokePBGestionSocial=response.token 
                //     console.log("token PB",locals.tokePBGestionSocial)	 */
            }   
    } catch (err) {
        console.error('Failed to refresh auth token', err);
        // clear the auth store on failed refresh
        locals.pb.authStore.clear();
        locals.user = undefined
    }
   
    if(
        url.pathname.startsWith('/') && 
        !locals.user && !locals.tokeFinancial &&
        !['/login','/asociado/solicitudes/login','/asociado/detalles/login','/register'].includes(url.pathname)
        ){
            redirect(303,'/asociado/solicitudes/login')
        }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', locals.pb.authStore.exportToCookie());

    return response;
}

