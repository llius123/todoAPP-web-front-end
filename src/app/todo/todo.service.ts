import { EventEmitter } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TodoInterface } from "../components/todo/todo-list/todo-list.component";
import { ProyectoInterface } from "../components/proyecto/proyecto/proyecto.component";

@Injectable({
	providedIn: "root"
})
export class TodoService {
	constructor(private httpClient: HttpClient) {}

	// Guardo en este servicio el proyectro seleccionado
	public proyectoSeleccionado: ProyectoInterface;

	//Obtengo los breadcrumbs donde estoy
	public obtenerBreadcrumDeLaRutaActual: EventEmitter<any> = new EventEmitter<any>();

	public getTodoList(idProyecto: number): Observable<TodoInterface[]> {
		return this.httpClient.get<TodoInterface[]>(
			environment.apiPath + "todo/getAllTodo/" + idProyecto
		);
	}

	public actualizarOrden(
		orden: [{ id: number; orden: number }],
		proyecto: number
	): Observable<any> {
		return this.httpClient.put<any>(
			environment.apiPath + "todo/updateOrderTodo/" + proyecto,
			orden
		);
	}

	public editarSimpleTodo(
		todo: TodoInterface,
		idProyecto: number
	): Observable<any> {
		return this.httpClient.put<any>(
			environment.apiPath + "todo/updateSimpleTodo/" + idProyecto,
			todo
		);
	}

	public crearTodo(
		todo: TodoInterface,
		idProyecto: number
	): Observable<TodoInterface> {
		return this.httpClient.post<TodoInterface>(
			environment.apiPath + "todo/createTodo/" + idProyecto,
			todo
		);
	}

	public getAllProyectos(): Observable<ProyectoInterface[]> {
		return this.httpClient.get<ProyectoInterface[]>(
			environment.apiPath + "proyecto/getAllProyecto"
		);
	}

	public createProyecto(
		proyecto: ProyectoInterface
	): Observable<ProyectoInterface> {
		return this.httpClient.post<ProyectoInterface>(
			environment.apiPath + "proyecto/createProyecto",
			proyecto
		);
	}

	public eliminarTodo(todo: TodoInterface): Observable<TodoInterface> {
		return this.httpClient.delete<TodoInterface>(environment.apiPath + "proyecto/eliminarTodo/" + todo.id)
	}
}
