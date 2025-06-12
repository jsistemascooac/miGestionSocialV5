//import { Data } from '@mux/mux-node/resources/index.mjs';
import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});


export const loginAsociadoSchema = z.object({
	usuario: z.string().min(6),
	email: z
	.string()
    .min(1, { message: "Este campo debe ser llenado." })
    .email("Esto no es un email."),
//	 funcionalidad: z.string().optional(),
	 //emailExpinn:z.string().optional(),
/*	auxilio: z.string().optional()  */
})/*.refine((data) => data.email === data.emailExpinn, {
	message: "Passwords don't match",
    path: ["confirm"], // path of error
})*/
/* .refine((arg) => ((arg.funcionalidad === "solicitudes" && arg.auxilio)||arg.funcionalidad === "detalles"),
{message: "Selecciona un tipo de Auxilio!",
	path: ['auxilio']
}); */
/* .superRefine(({ funcionalidad, auxilio }, ctx) => {
	if (funcionalidad == "solicitudes" && auxilio ) {
	ctx.addIssue({
	code: "custom",
	message: "Debe elegir una solcitud",
	})
	}
	}) */
/* .refine((data) => (data.funcionalidad == "solicitudes" && data.auxilio), {
	message: `Debe elegir una solcitud`,
	path: ['usuario']
}); */

export const SolicitudSeriviocoSchema = z.object({
  servicio:	z.string(),
  identificacion:z.number({ coerce: true }).min(3),
 
})

export const registerSchema = z
	.object({
		firstName: z.string().min(3),
		lastName: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8),
		passwordConfirm: z.string()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords do not match',
		path: ['passwordConfirm']
	});

	export const courseSchema = z.object({
		title: z.string().min(1),
		description: z.string(),
		imageUrl: z.string().optional(),
		price: z.number({ coerce: true }).optional(),
		isPublished: z.boolean(),
		category: z.string().optional()
	});

export const workflowsSchema = z.object({
  nombre:z.string(),
})

export const wfMovimientosSchema = z.object({
	wf_tarea: z.string().optional(),
	wf_workflow: z.string(),
	wf_estado: z.string().optional(),

})


export const wfSolicitudSchema = z.object({	
	wf_workflow: z.string(),	

})

export const wfMovimientoValidacionesSchema = z.object({	
	wf_movimiento: z.string(),	
	wf_workflow: z.string(),	
	wf_tarea: z.string(),	
	wf_estado: z.string(),	
	wf_siguiente_tarea:z.string(),
	identificacion:z.string(),
})


export const solicitudesSchema = z.object({
	title: z.string().min(1),
	description: z.string(),
	imageUrl: z.string().optional(),
	price: z.number({ coerce: true }).optional(),
	isPublished: z.boolean(),
	category: z.string().optional()
});

export const PersonaFamiliarSchema = z
	.object({
		nombres: z.string().min(3).optional(),
		apellidos: z.string().min(3).optional(),
		identificacion: z.string().optional(),
		fallecimiento:z.date().optional(),
	})


export const ValorSchema = z
	.object({
		valor: z.number()
	})

export const CuotaSchema = z
	.object({
		cuotas: z.number()
	})

export const AcompanantesSchema = z
	.object({
		acompanantes: z.number(),
	})

export const WFValidacionesEstadoSchema = z
	.object({
		wf_tareas_validaciones_estado: z.string(),
		observacion: z.string(),
	})	

	

export const TransferenciaBacariaSchema = z
.object({

	as_banco: z.string().min(3).optional(),	
	as_bancos_cuenta_tipo: z.string().optional(),
	numeroCuenta: z.string().min(3).optional(),
	noCuentaRegistrada:z.boolean().optional()
})




export const FallecimientoSchema = z
.object({
	fallecimiento: z.string(),
	c_digo_dane_del_departamento:z.string(),
	c_digo_dane_del_municipio:z.string()
})

export const BancosSchema = z
.object({
	banco: z.string().min(3),	
	tipo_cuenta: z.string(),
	numeroCuenta: z.string().min(3)	

})

export const SepeSchema = z
.object({
	sepe: z.boolean(),
	uso_sepe: z.boolean(),
})


export const MunicipiosSchema = z
.object({
	c_digo_dane_del_municipio:z.string(),
	
})


export const wfWorkflowConfSchema = z.object({
	beneficiario:z.boolean(),
	as_beneficiarios_tipo:z.string(),
	/*identificacion: z.string(),	
	 nombres: z.string(),
	apellidos: z.string(), */
	fecha_evento:z.date(),
	lugar_nacimiento: z.string(),
	valor: z.number({ coerce: true }).optional(),
	as_bancos_cuenta_tipo: z.string(),
	as_banco: z.string(),
	observacion: z.string(),
	wf_movimiento: z.string(),		
	fallecimiento: z.date(),
	c_digo_dane_del_municipio:z.string(),

});


export const WFMovimientosValidacionesMovimientosSchema = z.object({
	id:z.string(),
	wf_tareas_validaciones_estado: z.string(),	
	observacion: z.string().optional(),
})



export const wfWorkflowConfiguracionSchema =z.union([wfWorkflowConfSchema,PersonaFamiliarSchema,TransferenciaBacariaSchema])

export const titleSchema = courseSchema.pick({ title: true });
export const descriptionSchema = courseSchema.pick({ description: true });
export const categorySchema = courseSchema.pick({ category: true });
export const priceSchema = courseSchema.pick({ price: true });

export const beneficiarioSchema = wfWorkflowConfSchema.pick({ beneficiario: true });
export const beneficiarioTipoSchema = wfWorkflowConfSchema.pick({ as_beneficiarios_tipo: true });
export const personaFamiliarSchema = PersonaFamiliarSchema.pick({nombres:true,apellidos:true,identificacion:true})
export const fallecimientoSchema = FallecimientoSchema.pick({fallecimiento:true,c_digo_dane_del_municipio:true,c_digo_dane_del_departamento:true})
export const sepeSchema = SepeSchema.pick({sepe:true,uso_sepe:true})
export const transferenciaBacariaSchema = TransferenciaBacariaSchema.pick({as_banco:true,as_bancos_cuenta_tipo:true,noCuentaRegistrada:true,numeroCuenta:true})
export const bancosSchema = BancosSchema.pick({banco:true,tipo_cuenta:true,numeroCuenta:true})
export const wfMVMovimientosSchema = WFMovimientosValidacionesMovimientosSchema.pick({wf_tareas_validaciones_estado:true,id:true,observacion:true})

//Terceros Esquemas
export const solicitudServicioAsociadoSchema = SolicitudSeriviocoSchema.pick({servicio:true,identificacion:true})


export const valorSchema = wfWorkflowConfSchema.pick({ valor: true });
export const cuotasSchema = CuotaSchema.pick({ cuotas: true });
export const acompanantesSchema = AcompanantesSchema.pick({ acompanantes: true });


export const wfValidacionesEstadoSchema = WFValidacionesEstadoSchema.pick({ wf_tareas_validaciones_estado: true });
export const chapterTitleSchema = z.object({
	title: z.string().min(1)
});




export const chapterDescriptionSchema = z.object({
	description: z.string()
});
export const chapterAccessSchema = z.object({
	isFree: z.boolean()
});
export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginAsociadoSchema = typeof loginAsociadoSchema;
export type CourseSchema = z.infer<typeof courseSchema>;

export type WorkflowsSchema = z.infer<typeof workflowsSchema>;



