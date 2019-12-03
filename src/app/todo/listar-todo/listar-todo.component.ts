import { Component, OnInit } from "@angular/core";
import { TodoInterface } from "src/app/components/todo/todo-list/todo-list.component";
import { TodoService } from "../todo.service";
import * as svg from "svg";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
@Component({
	selector: "listar-todo",
	templateUrl: "./listar-todo.component.html",
	styleUrls: ["./listar-todo.component.scss"]
})
export class ListarTodoComponent implements OnInit {
	public todoList: TodoInterface[];
	public editTodo: TodoInterface;
	public mostrarHistorialMovil = "none";
	constructor(private _todoService: TodoService) {
		// EScondo o muestro la ventana de la derecha que es el editor de TODO
		this._todoService.mostrarEsconderEditarDatosTodoEventEmitter.subscribe(
			resp => {
				this.mostrarHistorialMovil = resp;
			}
		);
		this._todoService.todoEditado.subscribe(todo => {
			this.todoList.find((element, index) => {
				if (element.id === todo.id) {
					this.todoList[index] = todo;
				}
			});
		});
		this._todoService.nuevoTodoAnyadirLista.subscribe(todo => {
			this.todoList.push(todo);
		});
	}

	ngOnInit(): void {
		this.getAllTodo();
	}
	public getAllTodo() {
		this._todoService.getTodoList().subscribe(todo => {
			this.todoList = todo;
		});
	}
	public drag($event: {
		orden: [{ id: number; orden: number }];
		todos: TodoInterface[];
	}) {
		this._todoService.actualizarOrden($event.orden).subscribe(
			resp => {},
			error => {}
		);
	}
	public editarSimpleTodo($event: TodoInterface) {
		this._todoService.mostrarEsconderEditarDatosTodoEventEmitter.emit("");
		this._todoService.todo.emit($event);
	}
	public cambiarElCampoCompletado($event: TodoInterface) {
		this._todoService.editarSimpleTodo($event).subscribe(
			resp => {},
			error => {}
		);
	}
	public crearNuevoTodo() {
		this._todoService.mostrarEsconderEditarDatosTodoEventEmitter.emit("");
	}

	
}
