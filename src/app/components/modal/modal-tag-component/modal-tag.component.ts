import { Component, OnInit, ViewChild, Input, ElementRef, EventEmitter, Output } from "@angular/core";
import { TagInterface } from '../../tag/tag-component/tag-component.component';

@Component({
	selector: "modal-tag-component",
	templateUrl: "./modal-tag.component.html",
	styleUrls: ["./modal-tag.component.scss"]
})
export class ModalTagComponent implements OnInit {

	@Output() nuevoTag: EventEmitter<string> = new EventEmitter<string>();
	@Output() eliminarTag: EventEmitter<number> = new EventEmitter<number>();
	@Output() enlazarTagconTodo: EventEmitter<number> = new EventEmitter<number>();

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
		this.nuevoTag.emit(titulo);
	}
	ngOnDestroy(): void {
	}

	public eliminarTagDelDesplegable($event: any){
		this.eliminarTag.emit($event);
	}

	public enlazarTagConTodo($event: any){
		this.enlazarTagconTodo.emit($event)
	}
}
