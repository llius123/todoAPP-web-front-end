import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized, ActivationEnd } from '@angular/router';
import { TodoService } from '../todo.service';

export interface BreadcrumInterface {
	padre: [string],
	hijo: string,
	ruta?: string
}
@Component({
	selector: "breadcrum",
	templateUrl: "./breadcrum.component.html",
	styleUrls: ["./breadcrum.component.scss"]
})
export class BreadcrumComponent implements OnInit {

	@Input() set contenidoBreadcrum(data: BreadcrumInterface){
		this._contenidoBreadcrum = data;
	}
	get contenidoBreadcrum(){
		return this._contenidoBreadcrum;
	}
	private _contenidoBreadcrum: BreadcrumInterface = {padre: [''], hijo: ''};
	constructor(
		private _todoService: TodoService,
		private _router: Router
	) {
		this._todoService.obtenerBreadcrumDeLaRutaActual.subscribe(data => {
			this.contenidoBreadcrum = data;
		})
	}

	ngOnInit(): void {
	}

	public volverInicio($event: string){
		this._router.navigate([$event])
	}
}
