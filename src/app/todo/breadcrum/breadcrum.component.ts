import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized, ActivationEnd } from '@angular/router';
import { TodoService } from '../todo.service';

export interface BreadcrumInterface {
	padre: [string],
	hijo: string
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
		private _todoService: TodoService
	) {
		this._todoService.obtenerBreadcrumDeLaRutaActual.subscribe(data => {
			console.log(data.padre)
			this.contenidoBreadcrum = data;
		})
	}

	ngOnInit(): void {
	}
}
