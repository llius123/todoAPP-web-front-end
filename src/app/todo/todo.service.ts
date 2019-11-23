import { EventEmitter } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TodoInterface } from "../components/todo/todo-list/todo-list.component";

@Injectable({
	providedIn: "root"
})
export class TodoService {
	constructor(private httpClient: HttpClient) {}

	public mostrarEsconderEditarDatosTodoEventEmitter: EventEmitter<
		string
	> = new EventEmitter<string>();
	public nuevoTodoAnyadirLista: EventEmitter<TodoInterface> = new EventEmitter<
		TodoInterface
	>();

	public todo: EventEmitter<TodoInterface> = new EventEmitter<TodoInterface>();
	public todoEditado: EventEmitter<TodoInterface> = new EventEmitter<
		TodoInterface
	>();

	public getTodoList(): Observable<TodoInterface[]> {
		return this.httpClient.get<TodoInterface[]>(
			environment.apiPath + "todo/getAllTodo"
		);
	}

	public actualizarOrden(
		orden: [{ id: number; orden: number }]
	): Observable<any> {
		return this.httpClient.put<any>(
			environment.apiPath + "todo/updateOrderTodo",
			orden
		);
	}

	public editarSimpleTodo(todo: TodoInterface): Observable<any> {
		return this.httpClient.put<any>(
			environment.apiPath + "todo/updateSimpleTodo",
			todo
		);
	}

	public crearTodo(todo: TodoInterface): Observable<TodoInterface> {
		return this.httpClient.post<TodoInterface>(
			environment.apiPath + "todo/createTodo",
			todo
		);
	}
}
