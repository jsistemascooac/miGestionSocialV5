import type { AuthModel, RecordModel } from 'pocketbase';
import type { CourseSchema, WorkflowsSchema } from './schema';

// export type Course = RecordModel & CourseSchema & {
// 	title: string;
// 	description: string;
// 	imageUrl: string;
// 	price: number;
// 	isPublished: boolean;
// 	categoryId: string;
// 	userId: string;
// 	expand: {
// 		category: Category;
// 	};
// };
export type Course = RecordModel &
	CourseSchema & {
		user: string;
		expand?: {
			category: Category;
			user: AuthModel;
			'attachments(course)'?: Attachment[];
			'chapters(course)'?: Chapter[];
			'purchase(course)'?: Purchase[];
		};
	};
export type Category = RecordModel & {
	name: string;
};
export type Attachment = RecordModel & {
	name: string;
	url: File;
	course: string;
	expand: {
		course: Course;
	};
};
export type Chapter = RecordModel & {
	title: string;
	description: string;
	position: number;
	videoUrl: string;
	isPublished: boolean;
	isFree: boolean;
	course: string;
	expand?: {
		'muxData(chapterId)'?: MuxData[];
	};
};
export type MuxData = RecordModel & {
	assetId: string;
	playbackId: string;
	chapterId: boolean;
};
export type UserProgress = RecordModel & {
	user: string;
	chapter: string;
	isCompleted: boolean;
};
export type Purchase = RecordModel & {
	user: string;
	course: string;
};

export type Progress = {
	progress: number | null;
};
export type CourseWithProgressWithCategory = Course & {
	// category: Category | null;
	// chapters: { id: string }[];
	progress: number | null;
};

export type Auxilios = RecordModel & {
	descripcion: string;
	
	/* expand: {
		wf_auxilios_tipo: wf_auxilios_tipo;
	}; */
};


export type ASBancosCuentaTipos = RecordModel & {
	nombre: string;	
	codigo: string;
};

export type ASBancos = RecordModel & {
	nombre: string;
	codigo: string;
};

export type GSGruposTipos = RecordModel & {
	nombre: string;
};


export type GSGrupos = RecordModel & {
	nombre: string;
	tipo: GSGruposTipos;
};



export type GSEntidades = RecordModel & {
	nombre: string;
	grupo:GSGrupos;
};


export type GSServicios = RecordModel & {
	nombre: string;
	entidad:GSEntidades;
};

export type GSAuxilioTipos = RecordModel & {
	nombre: string;
	disable:boolean;
	entidad:GSEntidades;

};

export type GSAuxilios = RecordModel & {
	nombre: string;
	tipo: GSAuxilioTipos;
	disable:boolean;
};

export type WFTipo = RecordModel & {
	name: string;
	auxilio:GSAuxilios;
	servicio:GSServicios;
};

export type WFWorkflowEstados = RecordModel & {
	nombre: string;
	next: boolean;
	descripcion: string;
	expand?: {
		wf_workflow: WFWorkflows;
		wf_tarea:WFTareas;
	}
};




export type ASBeneficiariosTipo = RecordModel & {
	nombre: string;
};


export type Municipios = RecordModel & {
	c_digo_dane_del_departamento: string;
	c_digo_dane_del_municipio:string;
	departamento:string;
	municipio:string;
	region:string;
};

export type Departamentos = RecordModel & {
	c_digo_dane_del_departamento: string;	
	departamento:string;	
	
};


export type ASTransferenciaBancaria = RecordModel & {
	as_banco: ASBancos;
	as_bancos_cuenta_tipo: ASBancosCuentaTipos;
	numeroCuenta: string;
	noCuentaRegistrada:boolean;
};


export type WFWorkflowsConfiguracion = RecordModel & {
	id: string;
	beneficiario:boolean;
	as_beneficiarios_tipo:ASBeneficiariosTipo;
	identificacion: string;
	nombres: string;
	apellidos: string;
	fechaEvento:Date;
	lugarNacimiento: string;
	noCuentaRegistrada:boolean;
	as_bancos_cuenta_tipo: ASBancosCuentaTipos;
	as_banco: ASBancos;
	numeroCuenta:string;
	observacion: string;
	cuotas:number;
	acompanantes:number;
	expand?: {
		wf_movimiento: WFWorkflowsMovimientos;

		user: AuthModel;
		
	};
};

export type WFWorkflows = RecordModel &
	WorkflowsSchema & {
		nombre: string;
		expand?: {
			tipo: WFTipo;
			user: AuthModel;
			
		};
	};

	export type WFTareas = RecordModel & {
		nombre: string;
		expand?: {
			wf_estado: WFWorkflowEstados;
			wf_workflow: WFWorkflows;
			descripcion:string;
			wf_siguiente_tarea:WFTareas;
			gs_entidad:GSEntidades;
			url:string;
			user: AuthModel;

			/* 'attachments(course)'?: Attachment[];
			'chapters(course)'?: Chapter[];
			'purchase(course)'?: Purchase[]; */
		};
	};

	export type WFWorkflowsMovimientos = RecordModel 
	 & {
		
		wf_workflow: WFWorkflows;
		response_api:string;
		expand?: {
			wf_tarea: WFTareas;
			user: AuthModel;
			
		};
	};	


	export type WFMovimientosAnexos = RecordModel 
	 & {	
		
		soporte:string;
		expand?: {
			wf_movimiento: WFWorkflowsMovimientos
			wf_tarea: WFTareas;
			user: AuthModel;
			
		};
	};	


	export type WFValidaciones = RecordModel & {
		nombre: string;
		descripcion:string;
		campo: string;
		expand?: {					
			wf_tarea:WFTareas;		
			user: AuthModel;
			
		};
	};

	export type WFValidacionesEstados = RecordModel & {
		nombre: string;
		descripcion:string;
		solucion: string;
		no_aprobado:boolean;
		expand?: {		
			wf_workflow: WFWorkflows;
			wf_tarea:WFTareas;
			wf_tareas_validacion:WFValidaciones;
			user: AuthModel;
			
		};
	};


	export type WFMovimientosValidaciones = RecordModel 
	 & {
		
		observacion: String;		
		expand?: {
			wf_movimiento: WFWorkflowsMovimientos;
			wf_estado:WFWorkflowEstados;
			user: AuthModel;
			
		};
	};	




	export type WFValidacionesMovimientos = RecordModel 
	 & {
		id: String;
		validar: String;
		observacion: String;		
		wf_tareas_validaciones_estado:WFValidacionesEstados;
		expand?: {
			wf_movimientos_validaciones: WFValidaciones;
			wf_tareas_validacion:WFWorkflowEstados;
			wf_movimiento_anexo:WFMovimientosAnexos;
			
			
			user: AuthModel;
			
		};
	};	

		export type WFControl = RecordModel 
	 & {
		id: String;
		identificacion: String;
		gs_entidad:GSEntidades;
		expand?: {			
			
			user: AuthModel;
			
		};
	};	

	export type WFControlMovimientos = RecordModel 
	 & {
		id: String;
		validar: String;
		aprobado:Boolean;
		observacion: String;		
		wf_tareas_validaciones_estado:WFValidacionesEstados;
		expand?: {			
			wf_tareas_validaciones_estado:WFValidacionesEstados;
			wf_control:WFControl; 
			user: AuthModel;
			
		};
	};	

	export type WFWorkflowsAnexosTipos = RecordModel & {
		nombre: string;
		noActivo:boolean;
		soporte: File;
		expand?: {		
			user: AuthModel;
			
		};
	};

	export type WFWorkflowsConfiguracionAnexosTipos = RecordModel 
	 & {
		wf_workflow: WFWorkflows;		
		expand?: {
			wf_workflows_anexos_tipo: WFWorkflowsAnexosTipos;
			user: AuthModel;
			
		};
	};	
