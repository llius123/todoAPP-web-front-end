import { Component, OnInit } from "@angular/core";
import { TodoInterface } from "src/app/components/todo/todo-list/todo-list.component";
import { TodoService } from "../todo.service";
import * as svg from "svg";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { UtilsService } from 'src/app/global/utils.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
	selector: "listar-todo",
	templateUrl: "./listar-todo.component.html",
	styleUrls: ["./listar-todo.component.scss"]
})
export class ListarTodoComponent implements OnInit {
	public todoList: TodoInterface[];
	public editTodo: TodoInterface;
	public mostrarHistorialMovil = "none";
	
	public todo: TodoInterface;
	public formdata: FormGroup;
	
	private _idProyecto: number;
	constructor(private _todoService: TodoService, private _utilsService: UtilsService, private readonly _activatedRoute: ActivatedRoute) {
		// EScondo o muestro la ventana de la derecha que es el editor de TODO
		this._todoService.mostrarEsconderEditarDatosTodoEventEmitter.subscribe(
			resp => {
				this.mostrarHistorialMovil = resp;
			}
		);
	}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe(params => {
			this._idProyecto = params.id;
			this.getAllTodo(params.id);
		})
		this.formdata = new FormGroup({
			id: new FormControl(),
			titulo: new FormControl(),
			descripcion: new FormControl(),
			orden: new FormControl(),
			completado: new FormControl()
		});
	}
	//Obtengo todos los todo
	public getAllTodo(idProyecto: number) {
		this._todoService.getTodoList(idProyecto).subscribe(todo => {
			this.todoList = todo;
		});
	}
	//Cuando hago un drag se ejecuta este metodo
	public drag($event: {
		orden: [{ id: number; orden: number }];
		todos: TodoInterface[];
	}) {
		this._todoService.actualizarOrden($event.orden).subscribe(
			resp => {},
			error => {}
		);
	}
	//Editar un todo
	public editarSimpleTodo($event: TodoInterface) {
		this.todoList.find((element, index) => {
			if (element.id === $event.id) {
				this.todoList[index] = $event;
			}
		});
	}
	//Cambiar el estado del todo de completado  ano completado o al reves
	public cambiarElCampoCompletado($event: TodoInterface) {
		this._todoService.editarSimpleTodo($event, this._idProyecto).subscribe(
			resp => {},
			error => {}
		);
	}
	//Crear nuevo todo
	public crearNuevoTodo() {
		this.mostrarHistorialMovil = "";
		this.formdata.patchValue({
			id: null,
			titulo: '',
			descripcion: '',
			orden: null,
			completado: 0
		})
	}
	//Guardar el todo editado o el nuevo
	public guardar() {
		const todo: TodoInterface = this.formdata.getRawValue();
		if (todo.id !== null) {
			this._todoService.editarSimpleTodo(todo, this._idProyecto).subscribe(
				resp => {
					this.editarSimpleTodo(resp)
				},
				error => {
					console.log(error);
				}
			);
		} else {
			this._todoService.crearTodo(todo, this._idProyecto).subscribe(
				resp => {
					console.log(resp)
					this.todoList.push(resp);
				},
				error => {
					console.log(error);
				}
			);
		}
	}
	//Cancelo la edicion del todo
	public cancelar() {
		this._todoService.mostrarEsconderEditarDatosTodoEventEmitter.emit("none");
	}

	
}
