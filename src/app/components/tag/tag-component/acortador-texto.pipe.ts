import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'acortadorTextoPipe'
})
export class AcortadorTextoPipe implements PipeTransform {
	constructor() { }
	public transform(value: string): string {
		if(value.length > 0){
			let nuevoValor = "";
			for (let i = 0; i < value.length; i++) {
				if(i > 2){
					nuevoValor = nuevoValor + '...';
					return nuevoValor;
				}else{
					nuevoValor = nuevoValor + value.charAt(i);
				}
			}
		}else{
			return value;
		}
	}
}