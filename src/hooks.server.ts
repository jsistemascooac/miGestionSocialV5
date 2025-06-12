// src/hooks.server.js
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

    const {locals,request,url} = event
   
		


   // locals.tokeFinancial=''
    locals.pb = new PocketBase(env.PUBLIC_PB_LOCAL_IP);

    // load the store data from the request cookie string
    locals.pb.authStore.loadFromCookie(request.headers.get('cookie') || '');
    //console.log("token PBXYZ",locals.user,locals.tokeFinancial,locals.pb)	
    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        locals.pb.authStore.isValid && await locals.pb.collection('users').authRefresh();
        locals.user = locals.pb.authStore.model
       

            locals.tokeFinancial =  event.cookies.get('tokeFinancial');
            locals.estadoFinancial =  event.cookies.get('estadoFinancial');
            //event.cookies.delete("tokeFinancial", { path: "/" });
             const cookieTheme = event.cookies.get('tokeFinancial');
            //console.log("theme 2221",cookieTheme,event.cookies.get('pb_auth'))	
   
    
        
            if(locals.tokeFinancial){
              
                
                    
                    if (event.locals.pb.authStore.isValid) {
                        event.locals.user = event.locals.pb.authStore.model;
                    } else {
                        event.locals.user = undefined;
                    }
                
                   // global.EventSource = eventsource;
                   // console.log("theme 2221",event.locals.pb)
                    const response = await resolve(event);
                
                    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
                
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
        !['/','/login/asociado','/login','/register'].includes(url.pathname)
        ){
            redirect(303,'/login/asociado')
        }
 
    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', locals.pb.authStore.exportToCookie());

    return response;
}

