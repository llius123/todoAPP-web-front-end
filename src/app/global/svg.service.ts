import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as svg from 'svg';

@Injectable({
	providedIn: 'root'
})
export class SvgService {
	constructor( private sanitizer: DomSanitizer ) { }

	public getIconoEnSVG(icono: string): SafeHtml{
		switch (icono) {
			case 'todo_icon':
				return this.sanitizer.bypassSecurityTrustHtml(svg.todo_icon.icon);
				break;
		}
	}
}