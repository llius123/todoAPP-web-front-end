import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { SafeHtml } from "@angular/platform-browser";
import { SvgService } from "src/app/global/svg.service";

export interface TodoInterface {
	id: number;
	titulo: string;
	descripcion: string;
	tag: TagInterface;
	orden: number;
	completado: number;
}
export interface TagInterface {
	id: number;
	titulo: string;
}
@Component({
	selector: "todo-list",
	templateUrl: "./todo-list.component.html",
	styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
	@Input() set todos(data: TodoInterface[]) {
		this._todos = data;
	}
	get todos() {
		return this._todos;
	}
	@Input() set editTodo(data: TodoInterface) {
		if (this._todos && this._todos.length > 0 && data) {
			this._todos.forEach((element: TodoInterface, index: number) => {
				if (element.id === data.id) {
					this._todos[index] = {
						id: data.id,
						titulo: data.titulo,
						descripcion: data.descripcion,
						tag: data.tag,
						orden: data.orden,
						completado: +data.completado
					};
				}
			});
		}
	}

	@Output() data: EventEmitter<{
		orden: [{ id: number; orden: number }];
		todos: TodoInterface[];
	}> = new EventEmitter<{
		orden: [{ id: number; orden: number }];
		todos: TodoInterface[];
	}>();
	@Output() completado: EventEmitter<TodoInterface> = new EventEmitter<
		TodoInterface
	>();
	@Output() editarSimpleTodo: EventEmitter<TodoInterface> = new EventEmitter<
		TodoInterface
	>();
	@Output() nuevo: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() eliminar: EventEmitter<TodoInterface> = new EventEmitter<TodoInterface>();

	private _todos: TodoInterface[];
	//SVG
	public dragSvgIcon: SafeHtml;
	public completadoSvgIcon: SafeHtml;
	public noCompletadoSvgIcon: SafeHtml;
	public garbageSvgIcon: SafeHtml;
	ngOnInit() {
		this.dragSvgIcon = this._svgService.getIconoEnSVG("drag_icon");
		this.completadoSvgIcon = this._svgService.getIconoEnSVG("completado_icon");
		this.noCompletadoSvgIcon = this._svgService.getIconoEnSVG(
			"no_completado_icon"
		);
		this.garbageSvgIcon = this._svgService.getIconoEnSVG("garbage_icon");
	}
	constructor(private _svgService: SvgService) {}

	/**
	 * Evento que se ejecuta cuando se hace un drag del TODO
	 * @param event Objeto del drag de angular
	 */
	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
		const datos: [{ id: number; orden: number }] = [null];
		this._todos.forEach((element: TodoInterface, index) => {
			datos.push({ id: element.id, orden: index });
		});
		datos.splice(0, 1);
		this.data.emit({ orden: datos, todos: this._todos });
	}

	/**
	 * Emitir el evento de completar
	 * @param todo Objeto TODO
	 */
	editCompletado(todo: TodoInterface) {
		if (todo.completado === 1) {
			todo.completado = 0;
		} else {
			todo.completado = 1;
		}
		this.completado.emit(todo);
	}

	/**
	 * Emito el evento del todo seleccionado
	 * @param todo Objeto todo
	 */
	editarTodo(todo: TodoInterface) {
		this.editarSimpleTodo.emit(todo);
	}

	nuevoTodo() {
		this.nuevo.emit(true);
	}

	eliminarTodo(todo: TodoInterface){
		this.eliminar.emit(todo)
	}
}
