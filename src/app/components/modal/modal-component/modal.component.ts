import { Component, OnInit, ViewChild, Input, ElementRef, EventEmitter, Output } from "@angular/core";
import { TagInterface } from '../../tag/tag-component/tag-component.component';

export interface EventoModalInterface {
	accion: EventoModalEnum,
	titulo?: string
}

export enum EventoModalEnum{
	NUEVO_TAG
}

@Component({
	selector: "modal-component",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {

	@Output() eventosModal: EventEmitter<EventoModalInterface> = new EventEmitter<EventoModalInterface>(); 

	public estadoModal = 'none'

	public tagList: TagInterface[];
	constructor() {
	}
	ngOnInit(): void {
	}

	public cambiarEstadoModal(esconder: boolean){
		if(esconder){
			this.estadoModal = 'none';
		}else{
			this.estadoModal = 'block';
		}
	}

	public crearTagNuevo(titulo: string){
		this.eventosModal.emit({accion: EventoModalEnum.NUEVO_TAG, titulo: titulo});
	}
	ngOnDestroy(): void {
	}

	public eliminarTagDelDesplegable($event: any){

	}
	public enlazarTagConTodo($event: any){

	}
}
