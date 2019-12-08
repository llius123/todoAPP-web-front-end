import { Component, OnInit } from "@angular/core";
import { SvgService } from "./global/svg.service";
import { SafeHtml } from "@angular/platform-browser";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	public todoSvgIcon: SafeHtml;

	constructor(private _svgService: SvgService) {}
	ngOnInit(): void {
		// Llamo al archivo de svg para obtener el icono en svg
		this.todoSvgIcon = this._svgService.getIconoEnSVG("todo_icon");
	}
}
