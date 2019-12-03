import { Component, OnInit } from "@angular/core";
import { TodoService } from '../todo.service';
import { ProyectoInterface } from 'src/app/components/proyecto/proyecto/proyecto.component';

@Component({
	selector: "todo-proyecto",
	templateUrl: "./todo-proyecto.component.html",
	styleUrls: ["./todo-proyecto.component.scss"]
})
export class TodoProyectoComponent implements OnInit {
	
	public proyectos: ProyectoInterface[];

	constructor(
		private readonly _todoService: TodoService
	) {
	}

	ngOnInit(): void {
		//Obtengo los proyectos del back
		this.obtenerTodosProyectos()
	}

	private obtenerTodosProyectos(){
		this.proyectos = [{	id: 1, usuarioId: 1, titulo: 'qwe'}]
		// this._todoService.getAllProyectos().subscribe(proyectos => {this.proyectos = proyectos})
	}

	public proyectoSeleccionado($event: ProyectoInterface){
		console.log($event)
	}
}
