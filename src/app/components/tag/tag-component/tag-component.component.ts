import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

export interface TagInterface {
	id: number;
	titulo: string;
	proyecto_id: number;
}
@Component({
	selector: "tag-component",
	templateUrl: "./tag-component.component.html",
	styleUrls: ["./tag-component.component.scss"]
})
export class TagComponent implements OnInit {
	@Input() set tags(data: TagInterface[]) {
		this._tags = data;
		this.queTagsHayQueMostrar()
	}
	get tags() {
		return this._tags;
	}

	private _tags: TagInterface[];

	//Boleans que esconden/enseñan tags
	public tagsConTextoAcortado: boolean = false;
	public tagsSinTextoAcortado: boolean = false;
	public numeroDeTags: boolean = false;
	ngOnInit() {}
	constructor() {}

	public queTagsHayQueMostrar(){
		this.esconderTodosLosTags();
		if(this.tags.length > 3){
			this.numeroDeTags = true;
		}
		if(this.tags.length < 4){
			let acortarTexto = false;
			for (const tag in this.tags) {
				if(tag && this._tags[tag].titulo.length > 5){
					acortarTexto = true;
				}
			}
			if(acortarTexto){
				this.tagsConTextoAcortado = true;
			}else{
				this.tagsSinTextoAcortado = true;
			}
			
		}
	}

	private esconderTodosLosTags(){
		this.numeroDeTags = false;
		this.tagsConTextoAcortado = false;
		this.tagsSinTextoAcortado = false;
	}
}
