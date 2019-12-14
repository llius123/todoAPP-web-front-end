import { Injectable } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as svg from "svg";

@Injectable({
	providedIn: "root"
})
export class SvgService {
	constructor(private sanitizer: DomSanitizer) {}

	public getIconoEnSVG(icono: string): SafeHtml {
		switch (icono) {
			case "todo_icon":
				return this.sanitizer.bypassSecurityTrustHtml(svg.todo_icon.icon);
			case "completado_icon":
				return this.sanitizer.bypassSecurityTrustHtml(svg.completado_icon.icon);
			case "no_completado_icon":
				return this.sanitizer.bypassSecurityTrustHtml(
					svg.no_completado_icon.icon
				);
			case "drag_icon":
				return this.sanitizer.bypassSecurityTrustHtml(svg.drag_icon.icon);
			case "garbageSvgIcon":
				return this.sanitizer.bypassSecurityTrustHtml(svg.garbage_icon.icon);
		}
	}
}
