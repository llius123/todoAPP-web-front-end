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
	}
	get tags() {
		return this._tags;
	}

	private _tags: TagInterface[];
	ngOnInit() {}
	constructor() {}
}
