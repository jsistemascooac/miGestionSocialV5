<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
  	import { cn } from "$lib/utils.js";
  	import type { HTMLAttributes } from "svelte/elements";
  	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
  	const id = $props.id();
</script>


<div class={cn("flex flex-col gap-6", className)} {...restProps}>
  <Card.Root>
    <Card.Header class="text-center">
      <Card.Title class="text-xl">Bienvenidos al Sistema de Gestion Social COOACEDED</Card.Title>
      <Card.Description>Ingresa con tu Identificaciòn y su email</Card.Description>
    </Card.Header>
    <Card.Content>
      <form>
        <div class="grid gap-6">
          
          <div class="grid gap-6">
			<div class="grid gap-3">
              <div class="flex items-center">
                <Label for="identificacion-{id}">Identificacion</Label>
               <!--  <a
                  href="##"
                  class="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> -->
              </div>
              <Input id="identificacion-{id}" type="text" required />
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
        
            <Button type="submit" class="w-full">Login</Button>
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
