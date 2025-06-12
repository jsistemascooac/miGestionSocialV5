import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';


export default defineConfig({
	server: {
			allowedHosts: ['gestionsocial.cooaceded.coop','devgestionsocial.cooaceded.coop'],
		  },
	plugins: [, sveltekit()]
});
