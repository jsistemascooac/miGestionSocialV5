<script lang="ts">
	import LoginForm from "$lib/components/login-form.svelte";
    import type { LoginAsociadoSchema } from "$lib/schema";
    import type { Infer, SuperValidated } from "sveltekit-superforms";
	
 let { data }: {data: { form: SuperValidated<Infer<LoginAsociadoSchema>> }} = $props();
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
  <div class="flex w-full max-w-sm flex-col gap-6">
    <a href="##" class="flex items-center gap-2 self-center font-medium">
      <div
       
      >
      
		
			  <img class="w-40 mx-auto mb-5" alt="The project logo" src= '/LOGO.png' />
      </div>
     
    </a>
     <LoginForm data={data}/> 
  </div>
</div>
