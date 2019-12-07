import { Component, OnInit } from "@angular/core";
import { TodoService } from "./todo.service";
import { TodoInterface } from "../components/todo/todo-list/todo-list.component";
import { SafeHtml } from "@angular/platform-browser";
import { SvgService } from "../global/svg.service";

@Component({
	selector: "todo",
	templateUrl: "./todo.component.html",
	styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
	public todoSvgIcon: SafeHtml;

	constructor(
		private _svgService: SvgService
	) {
	}

	ngOnInit(): void {
		this.todoSvgIcon = this._svgService.getIconoEnSVG("todo_icon");
	}
}
