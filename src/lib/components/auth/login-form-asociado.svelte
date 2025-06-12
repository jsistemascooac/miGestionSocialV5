<script lang="ts">
    import { page } from "$app/state";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { loginAsociadoSchema, type LoginAsociadoSchema } from "$lib/schema";
  import { Loader2 } from '@lucide/svelte';
    import { toast } from "svelte-sonner";

  import SuperDebug, {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { data }: {  data: SuperValidated<Infer<LoginAsociadoSchema>>  } =
    $props();
 
  const form = superForm(data, {
    validators: zodClient(loginAsociadoSchema),
  });
 
  const { form: formData,  errors, message, enhance } = form;


	const {
		delayed,
		submit: submitCheckUsername,
		enhance: submitEnhance
	} = superForm(
		{ usuario: '' },
		{
			invalidateAll: false,
			applyAction: false,
			multipleSubmits: 'abort',
			onSubmit({ cancel }) {
				if (!$formData.usuario) cancel();
			},
			onUpdated({ form }) {
        toast.success(form.message);
        console.log("SIiii",form)
        if (form.message) {
          if (!form.valid) {
            toast.error(form.message);
          }
          if (form.valid) {
            toast.success(form.message);
           // toggleEdit();
          }
			}
      if($message){
          console.log("SIiii",$message)
  }
				// Update the other form to show the error message
				$errors.usuario = form.errors.usuario;
			}
		}
	);
  

</script>

<SuperDebug data={$formData} />
 {#if $message}
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<div class="status" class:error={page.status >= 400} class:success={page.status == 200}>
		{$message}
	</div>
{/if}
<div >
    <Card.Root>
      <Card.Header class="text-center">
        <Card.Title class="text-xl">Bienvenidos al Sistema de Gestion Social</Card.Title>
        <Card.Description>Ingresa con tu Identificaciòn y su email</Card.Description>
      </Card.Header>
      <Card.Content>
       
          <form method="POST" use:enhance>
             <div class="grid gap-6">
          
                <div class="grid gap-6">
                    <Form.Field {form} name="usuario">
                      <Form.Control>
                        {#snippet children({ props })}
                          <Form.Label>Identificacion</Form.Label>
                          <Input {...props} bind:value={$formData.usuario} />
                        {/snippet}
                      </Form.Control>
                      <Form.Description />
                      <Form.FieldErrors />
                    </Form.Field>
                    <Form.Field {form} name="email">
                    <Form.Control>
                        {#snippet children({ props })}
                          <Form.Label>Email</Form.Label>
                          <Input {...props} bind:value={$formData.email} />
                        {/snippet}
                      </Form.Control>
                      <Form.Description />
                      <Form.FieldErrors />
                    </Form.Field>       
            
         
                    <Form.Button class="w-full"
                        >{#if $delayed}
                          <Loader2 class="size-6 animate-spin " />
                        {:else}
                          Login
                      {/if}
                    </Form.Button>
                  </div>
         
               </div>
          </form>  
    </Card.Content>
  </Card.Root>
  <div
      class="text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs"
    >
      Diseñado y creado por COOACEDED <a href="https://cooaceded.coop/wordpress/wp-content/uploads/2025/01/protecciondatos1.pdf">Politicas de tratamientos de datos</a>.
  </div>
</div>