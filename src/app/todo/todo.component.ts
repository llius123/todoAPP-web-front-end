import { Component, OnInit } from "@angular/core";
import { TodoService } from "./todo.service";
import { TodoInterface } from "../components/todo/todo-list/todo-list.component";
import { SafeHtml } from "@angular/platform-browser";
import { SvgService } from "../global/svg.service";
import { Router } from "@angular/router";

@Component({
	selector: "todo",
	templateUrl: "./todo.component.html",
	styleUrls: ["./todo.component.scss"]
})
export class TodoComponent implements OnInit {
	public todoSvgIcon: SafeHtml;

	constructor(private _svgService: SvgService, private _router: Router) {}

	ngOnInit(): void {
		this.todoSvgIcon = this._svgService.getIconoEnSVG("todo_icon");
	}

	public navegacion(data: string) {
		switch (data) {
			case "proyecto":
				this._router.navigate(["todo/proyecto"]);
				break;

			default:
				break;
		}
	}
}
