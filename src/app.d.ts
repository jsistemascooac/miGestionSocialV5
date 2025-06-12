import Pocketbase, {type AuthModel} from 'Pocketbase'

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			pb:PockeBase;
			tokeFinancial:string | undefined;
			estadoFinancial:string | undefined;
			tokePBGestionSocial:string;
			identificacion:string;
			user: AuthModel | undefined
		 }
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
