import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";
import { ProyectoInterface } from "src/app/components/proyecto/proyecto/proyecto.component";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
	selector: "todo-proyecto",
	templateUrl: "./todo-proyecto.component.html",
	styleUrls: ["./todo-proyecto.component.scss"]
})
export class TodoProyectoComponent implements OnInit {
	public proyectos: ProyectoInterface[];
	public formularioNuevoProyecto: FormGroup;
	public mostrarNuevoHistorial = "none";

	constructor(
		private _todoService: TodoService,
		private readonly _router: Router,
		private readonly _activatedRoute: ActivatedRoute,
	) {
		this._activatedRoute.data.subscribe(data => this._todoService.obtenerBreadcrumDeLaRutaActual.emit(data))
		this.formularioNuevoProyecto = new FormGroup({
			id: new FormControl(),
			titulo: new FormControl()
		});
	}

	ngOnInit(): void {
		// Obtengo los proyectos del back
		this.obtenerTodosProyectos();
	}

	private obtenerTodosProyectos() {
		this._todoService.getAllProyectos().subscribe(proyectos => {
			this.proyectos = proyectos;
		});
	}

	public proyectoSeleccionado($event: ProyectoInterface) {
		this._todoService.proyectoSeleccionado = $event;
		this._router.navigate([`todo/proyecto/${$event.id}`]);
	}

	public nuevoProyecto() {
		this.mostrarNuevoHistorial = "";
		this.formularioNuevoProyecto.patchValue({
			id: null,
			titulo: ""
		});
	}

	public cancelar() {
		this.mostrarNuevoHistorial = "none";
	}

	public guardar() {
		this._todoService
			.createProyecto(this.formularioNuevoProyecto.getRawValue())
			.subscribe(resp => {
				this.proyectos.push(resp[0]);
			});
	}

	public eliminarProyecto($event: ProyectoInterface){
		this._todoService.eliminarProyecto($event.id).subscribe(
			resp => {
				this.proyectos.forEach((element: ProyectoInterface, index:number) => {
					if(element.id == $event.id){
						this.proyectos.splice(index,1)
					}
				});
			},
			error => {
			})
	}
}
