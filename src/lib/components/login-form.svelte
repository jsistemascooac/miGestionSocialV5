<script lang="ts">
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
  	import * as Form from "$lib/components/ui/form/index.js";
	import SuperDebug, { type SuperValidated,type Infer,superForm } from "sveltekit-superforms";
  	import { cn } from "$lib/utils.js";
  	import type { HTMLAttributes } from "svelte/elements";
    import {   loginAsociadoSchema, type LoginAsociadoSchema } from "$lib/schema";
import { Loader2 } from '@lucide/svelte';
	
  	let { data }: { data: { form: SuperValidated<Infer<LoginAsociadoSchema>> }}= $props();

  //	const id = $props.id();
    //let { data } = $props();
    
	const  form = superForm(data.form,{
        validators:zodClient(loginAsociadoSchema)
    })

     const {form: formData, enhance, delayed} = form 



</script>

<SuperDebug data={$formData} />
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
			<Form.Field {form} name="email">
				<Form.Control>
					<Form.Label>Email</Form.Label>
					<Input bind:value={$formData.email} />
				</Form.Control>
				
				<Form.FieldErrors />
				</Form.Field>
			<Form.Field  {form} name="usuario">
				<Form.Control>
					<Form.Label>Password</Form.Label>
					<Input type="text" bind:value={$formData.usuario} />
				</Form.Control>
				
				<Form.FieldErrors />
			</Form.Field>
			 <Form.Button class="w-full"
			>{#if $delayed}
				<Loader2 class="size-6 animate-spin " />
			{:else}
				Login
			{/if}</Form.Button>
		<!-- 	<div class="grid gap-3">
              <div class="flex items-center">
                <Label for="identificacion-{id}">Identificacion</Label>
              
              </div>
              <Input id="identificacion-{id}" type="text" required {form} name="email"/>
            </div>
            <div class="grid gap-3">
              <Label for="email-{id}">Email</Label>
              <Input
                id="email-{id}"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
         -->
           <!--  <Button type="submit" class="w-full">Login</Button> -->
          </div>
         <!--  <div class="text-center text-sm">
            Don&apos;t have an account?
            <a href="##" class="underline underline-offset-4"> Sign up </a>
          </div> -->
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
