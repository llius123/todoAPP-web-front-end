import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

export interface ProyectoInterface {
	id: number,
	usuarioId: number,
	titulo: string
}
@Component({
	selector: "proyecto-component",
	templateUrl: "./proyecto.component.html",
	styleUrls: ["./proyecto.component.scss"]
})
export class ProyectoComponent implements OnInit {
	
	@Input() set proyecto(proyecto: ProyectoInterface){
		this._proyecto = proyecto
	}
	get proyecto(): ProyectoInterface{
		return this._proyecto;
	}

	@Output() proyectoSeleccionado: EventEmitter<ProyectoInterface> = new EventEmitter<ProyectoInterface>();

	private _proyecto: ProyectoInterface;
	ngOnInit() {}
	constructor() {}

	public emitirProyectoSeleccionadop(){
		this.proyectoSeleccionado.emit(this.proyecto)
	}
}
