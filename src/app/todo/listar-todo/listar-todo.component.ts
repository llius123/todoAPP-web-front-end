import { Component, OnInit } from "@angular/core";
import { TodoInterface } from "src/app/components/todo/todo-list/todo-list.component";
import { TodoService } from "../todo.service";
import * as svg from "svg";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { UtilsService } from "src/app/global/utils.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
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
	constructor(
		private _todoService: TodoService,
		private _utilsService: UtilsService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe(params => {
			this._idProyecto = params.id;
			this.getAllTodo(params.id);
		});
		this.formdata = new FormGroup({
			id: new FormControl(),
			titulo: new FormControl(),
			descripcion: new FormControl(),
			orden: new FormControl(),
			completado: new FormControl()
		});
	}
	// Obtengo todos los todo
	public getAllTodo(idProyecto: number) {
		this._todoService.getTodoList(idProyecto).subscribe(todo => {
			this.todoList = todo;
		});
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
					console.log(resp);
					this.todoList.push(todo);
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
}
