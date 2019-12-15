import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SvgService } from 'src/app/global/svg.service';
import { SafeHtml } from '@angular/platform-browser';

export interface ProyectoInterface {
	id: number;
	usuarioId: number;
	titulo: string;
}
@Component({
	selector: "proyecto-component",
	templateUrl: "./proyecto.component.html",
	styleUrls: ["./proyecto.component.scss"]
})
export class ProyectoComponent implements OnInit {
	@Input() set proyecto(proyecto: ProyectoInterface) {
		this._proyecto = proyecto;
	}
	get proyecto(): ProyectoInterface {
		return this._proyecto;
	}

	@Output() proyectoSeleccionado: EventEmitter<
		ProyectoInterface
	> = new EventEmitter<ProyectoInterface>();
	@Output() eliminarProyecto: EventEmitter<
		ProyectoInterface
	> = new EventEmitter<ProyectoInterface>();

	private _proyecto: ProyectoInterface;

	public deleteSvgIcon: SafeHtml;
	public arrowSvgIcon: SafeHtml;
	constructor(private readonly _svgService: SvgService) {}
	ngOnInit() {
		this.deleteSvgIcon = this._svgService.getIconoEnSVG("garbage_icon");
		this.arrowSvgIcon = this._svgService.getIconoEnSVG("arrow_icon");
	}

	public emitirProyectoSeleccionadop() {
		this.proyectoSeleccionado.emit(this.proyecto);
	}

	public eliminar(){
		this.eliminarProyecto.emit(this.proyecto)
	}
}
