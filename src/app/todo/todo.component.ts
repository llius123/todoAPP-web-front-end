import { Component, OnInit } from "@angular/core";
import { TodoService } from "./todo.service";
import { TodoInterface } from "../components/todo/todo-list/todo-list.component";
import { SafeHtml } from "@angular/platform-browser";
import { SvgService } from "../global/svg.service";

@Component({
	selector: "todo",
	templateUrl: "./todo.component.html",
	styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
	public todoList: TodoInterface[];
	public editTodo: TodoInterface;
	public todoSvgIcon: SafeHtml;

	public mostrarHistorialMovil = "none";
	constructor(
		private _todoService: TodoService,
		private _svgService: SvgService
	) {
		// // EScondo o muestro la ventana de la derecha que es el editor de TODO
		// this._todoService.mostrarEsconderEditarDatosTodoEventEmitter.subscribe(
		// 	resp => {
		// 		this.mostrarHistorialMovil = resp;
		// 	}
		// );
	}

	ngOnInit(): void {
		// // Obtengo todos los todos
		// this.getAllTodo();
		// // Llamo al archivo de svg para obtener el icono en svg
		// this.todoSvgIcon = this._svgService.getIconoEnSVG("todo_icon");
	}
	// /**
	//  * Obtener todos los TODOs del back
	//  */
	// public getAllTodo() {
	// 	this._todoService.getTodoList().subscribe(todo => {
	// 		this.todoList = todo;
	// 	});
	// }
	// /**
	//  * Cuando muevo un TODO se ejecuta este metodo y envio al back el orden de todas las tareas
	//  * @param $event [{ id: number; orden: number }];todos: TodoInterface[]
	//  */
	// public drag($event: {
	// 	orden: [{ id: number; orden: number }];
	// 	todos: TodoInterface[];
	// }) {
	// 	this._todoService.actualizarOrden($event.orden).subscribe(
	// 		resp => {
	// 			// TODO
	// 		},
	// 		error => {
	// 			// TODO
	// 		}
	// 	);
	// }
	// /**
	//  * Edito un TODO
	//  * @param $event TodoInterface
	//  */
	// public editarSimpleTodo($event: TodoInterface) {
	// 	this._todoService.editarSimpleTodo($event).subscribe(
	// 		resp => {},
	// 		error => {}
	// 	);
	// }
}
