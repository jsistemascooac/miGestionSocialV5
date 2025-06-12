<script lang="ts">
	import LoginFormAsociado from "$lib/components/auth/login-form-asociado.svelte";
  import LoginForm from "$lib/components/auth/login-form.svelte";
  
 let { data } = $props();
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
  <div class="flex w-full max-w-sm flex-col gap-6">
    <a href="##" class="flex items-center gap-2 self-center font-medium">
      <div>
        <img class="w-40 mx-auto mb-5" alt="The project logo" src= '/LOGO.png' />
      </div>
     
    </a>
    
    {#if data.rol=='asociado'}
        <LoginFormAsociado data={data.form}/> 
    {:else}
        <LoginForm data={data.form}/> 
    {/if}
     
  </div>
</div>
