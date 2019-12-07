import { Component, OnInit } from "@angular/core";
import { TodoService } from '../todo.service';
import { ProyectoInterface } from 'src/app/components/proyecto/proyecto/proyecto.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: "todo-proyecto",
	templateUrl: "./todo-proyecto.component.html",
	styleUrls: ["./todo-proyecto.component.scss"]
})
export class TodoProyectoComponent implements OnInit {
	
	public proyectos: ProyectoInterface[];
	public formularioNuevoProyecto: FormGroup;
	public mostrarNuevoHistorial: string = "none";

	constructor(
		private readonly _todoService: TodoService,
		private readonly _router: Router
	) {
		this.formularioNuevoProyecto = new FormGroup({
			id: new FormControl(),
			titulo: new FormControl()
		})
	}

	ngOnInit(): void {
		//Obtengo los proyectos del back
		this.obtenerTodosProyectos()
	}

	private obtenerTodosProyectos(){
		this.proyectos = [{	id: 1, usuarioId: 1, titulo: 'qwe'},{	id: 2, usuarioId: 1, titulo: 'qwe'},{	id: 3, usuarioId: 1, titulo: 'qwe'},{	id: 4, usuarioId: 1, titulo: 'qwe'}]
		// this._todoService.getAllProyectos().subscribe(proyectos => {this.proyectos = proyectos})
	}

	public proyectoSeleccionado($event: ProyectoInterface){
		this._todoService.proyectoSeleccionado = $event;
		this._router.navigate([`todo/proyecto/${$event.id}`])
	}

	public nuevoProyecto(){
		this.mostrarNuevoHistorial = "";
		this.formularioNuevoProyecto.patchValue({
			id: null,
			titulo: ''
		})
	}

	public cancelar(){
		this.mostrarNuevoHistorial = "none";
	}
}
