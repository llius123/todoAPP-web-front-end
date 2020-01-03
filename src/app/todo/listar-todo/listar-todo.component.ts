import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { TodoInterface } from "src/app/components/todo/todo-list/todo-list.component";
import { TodoService } from "../todo.service";
import { UtilsService } from "src/app/global/utils.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { TagInterface } from 'src/app/components/tag/tag-component/tag-component.component';
import { EventoModalInterface, EventoModalEnum } from 'src/app/components/modal/modal-component/modal.component';
@Component({
	selector: "listar-todo",
	templateUrl: "./listar-todo.component.html",
	styleUrls: ["./listar-todo.component.scss"]
})
export class ListarTodoComponent implements OnInit {
	public todoList: TodoInterface[];
	public editTodo: TodoInterface;
	// Esta variable sirve para esconder/enseñar la parte de edicion de TODO
	public mostrarEdicionTodo = "none";

	// Esta variable sirve para mostrar esconder los botones de completado, que solo se mostraran cuando se edite un todo
	public mostrarBotonesCompletadoEditarTodo = false;

	public todo: TodoInterface;
	public formdata: FormGroup;

	private _idProyecto: number;

	public tagList: TagInterface[];
	public tagDelTodo: TagInterface[];

	@ViewChild("tagModal",  {static:false}) tagModal : any;
	constructor(
		private _todoService: TodoService,
		private _utilsService: UtilsService,
		private readonly _activatedRoute: ActivatedRoute
	) {
	}

	ngOnInit(): void {
		this._activatedRoute.data.subscribe(data => this._todoService.obtenerBreadcrumDeLaRutaActual.emit(data))
		this._activatedRoute.params.subscribe(params => {
			this._idProyecto = params.id;
			this.getAllTodo(params.id);
			this.getAllTag(params.id)
		});
		this.formdata = new FormGroup({
			id: new FormControl(),
			titulo: new FormControl(),
			descripcion: new FormControl(),
			orden: new FormControl(),
			completado: new FormControl()
		});
	}
	// Obtengo todos los tags
	public getAllTag(idProyecto: number){
		this._todoService.getAllTag(idProyecto).subscribe(tag => {
			this.tagList = tag;
			this.tagModal.tagList = tag;
		})
	}
	// Obtengo todos los todo
	public getAllTodo(idProyecto: number) {
		this._todoService.getTodoList(idProyecto).subscribe(todo => {
			this.todoList = todo;
		});
	}
	//Obtengo un simple todo
	public getSimpleTodo(idTodo: number){
		this._todoService.getSimpleTodo(this._idProyecto, this.formdata.get("id").value).subscribe(
			resp => {
				this.editarSimpleTodo(resp)
			}
		)
	}
	// Cuando hago un drag se ejecuta este metodo
	public drag($event: {
		orden: [{ id: number; orden: number }];
		todos: TodoInterface[];
	}) {
		this._todoService.actualizarOrden($event.orden, this._idProyecto).subscribe(
			resp => {},
			error => {}
		);
	}
	// Editar un todo
	public editarSimpleTodo($event: TodoInterface) {
		this.mostrarEdicionTodo = "";
		this.mostrarBotonesCompletadoEditarTodo = true;
		this.formdata.patchValue({
			id: $event.id,
			titulo: $event.titulo,
			descripcion: $event.descripcion,
			orden: $event.orden,
			completado: $event.completado
		});
		this.tagDelTodo = $event.tag;
	}
	// Editar lista de todos
	public editarListaTodo(todo: TodoInterface) {
		if (this.todoList.length > 0) {
			this.todoList.find((element, index) => {
				if (element.id === todo.id) {
					this.todoList[index] = todo;
				}
			});
		} else {
			this.todoList.push(todo);
		}
	}
	// Cambiar el estado del todo de completado  ano completado o al reves
	public cambiarElCampoCompletado($event: TodoInterface) {
		this._todoService.editarSimpleTodo($event, this._idProyecto).subscribe(
			resp => {},
			error => {}
		);
	}
	// Crear nuevo todo
	public crearNuevoTodo() {
		this.mostrarEdicionTodo = "";
		this.mostrarBotonesCompletadoEditarTodo = false;
		let ordenUltimoElementoTodo = 0;
		if (this.todoList.length > 0) {
			ordenUltimoElementoTodo = this.todoList[this.todoList.length - 1].orden;
		}
		this.formdata.patchValue({
			id: null,
			titulo: "",
			descripcion: "",
			orden: ordenUltimoElementoTodo,
			completado: 0
		});
	}
	// Guardar el todo editado o el nuevo
	public guardar() {
		const todo: TodoInterface = this.formdata.getRawValue();
		if (todo.id !== null) {
			this._todoService.editarSimpleTodo(todo, this._idProyecto).subscribe(
				resp => {
					this.editarListaTodo(todo);
				},
				error => {
					console.log(error);
				}
			);
		} else {
			this._todoService.crearTodo(todo, this._idProyecto).subscribe(
				resp => {
					this.todoList.push(resp);
					this.formdata.patchValue({
						id: resp.id,
						titulo: resp.titulo,
						descripcion: resp.descripcion,
						orden: resp.orden,
						completado: resp.completado
					});
				},
				error => {
					console.log(error);
				}
			);
		}
	}
	// Cancelo la edicion del todo
	public cancelar() {
		this.mostrarEdicionTodo = "none";
	}
	//Elimino un todo
	public eliminarTodo($event: TodoInterface){
		$event = $event[0];
		this._todoService.eliminarTodo($event).subscribe(
			resp => {
				this.todoList.forEach((element: TodoInterface, index:number) => {
					if(element.id == $event.id){
						this.todoList.splice(index,1)
					}
				});
			},
			error => {
			})
	}
	//Elimino el tag seleccionado del dropdown
	public eliminarTagDelDesplegable(opcionSeleccionado: number){
		this._todoService.eliminarTag(this.tagList[opcionSeleccionado].id).subscribe(
			resp => {
				this.tagList.splice(opcionSeleccionado, 1);
				this.getAllTag(this._idProyecto)
			}
		);
	}
	//Añado el tag que se acaba de crear con el input
	public crearYEnlazarTagConTodo(tituloTag: string){
		this._todoService.crearYEnlazarTagConTodo(this._idProyecto, this.formdata.get("id").value, { id: null, titulo: tituloTag, proyecto_id: this._idProyecto} ).subscribe(
			resp => {
				console.log(resp)
				this.getAllTag(this._idProyecto)
			},
			error => {
				console.log(error)
			}
		)
	}

	//Enlazo un tag ya existente con el todo 
	public enlazarTagConTodo(opcionSeleccionado: number) {
		let esUnTagDelTodo = false;
		for (const tag in this.tagDelTodo) {
			if(this.tagList[opcionSeleccionado].id === this.tagDelTodo[tag].id){
				esUnTagDelTodo = true;
			}
		}
		if(!esUnTagDelTodo){
			this._todoService.enlazarTagConTodo(this._idProyecto, this.formdata.get("id").value, this.tagList[opcionSeleccionado].id).subscribe(
				resp => {
					console.log(resp)
					this.getAllTag(this._idProyecto);
					this.tagDelTodo.push(this.tagList[opcionSeleccionado]);
				},
				error => {
					console.log(error);
				}
			)
		}
	}

	//Elimino el tag que esta enlazado a un todo
	public eliminarEnlaceTagTodo(tag: TagInterface,index: number){
		this._todoService.eliminarEnlaceTagConTodo(
			this._idProyecto,
			this.formdata.get("id").value,
			tag.id
		).subscribe(resp => {
			this.tagDelTodo.splice(index, 1)
		})
	}

	//Abro el modal
	public abrirModal(){
		this.tagModal.tagList = this.tagList;
		this.tagModal.cambiarEstadoModal(false)
	}

	//Escucho los eventos del componente modal
	public escucharEventosModal($event: EventoModalInterface){
		switch ($event.accion) {
			case EventoModalEnum.NUEVO_TAG:
				this.crearYEnlazarTagConTodo($event.titulo);
				this.obtenerTodosLosTagAsociadosAlTodoSeleccionado()
				break;
		}
	}

	//Obtengo todos los tags asociados al todo seleccionado
	public obtenerTodosLosTagAsociadosAlTodoSeleccionado(){
		this._todoService.getAllTagsByTodo(this._idProyecto, this.formdata.get("id").value).subscribe(
			resp => {
				this.tagDelTodo = resp;
				let todoConTagsActualizado: TodoInterface = this.formdata.getRawValue();
				todoConTagsActualizado = {...todoConTagsActualizado, tag: resp};
				this.editarListaTodo(todoConTagsActualizado)
			}
		)
	}
}