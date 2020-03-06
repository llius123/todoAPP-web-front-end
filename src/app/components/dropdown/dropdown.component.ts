import {Component, OnInit, Input} from '@angular/core';

export interface ListaItems{
	id: number,
	titulo: string
}

@Component({
    selector: 'dropdown',
    template: `
		<div class="custom-select-wrapper" (click)="abrirDropdown()">
			<div class="custom-select">
				<div class="custom-select__trigger"><span>Tesla</span>
					<div class="arrow"></div>
				</div>
				<div class="custom-options">
					
					<span class="custom-option selected" data-value=""></span>
					<span class="custom-option" data-value="tesla">Tesla</span>
					<span class="custom-option" data-value="volvo">Volvo</span>
					<span class="custom-option" data-value="mercedes">Mercedes</span>
				</div>
			</div>
		</div>
	`,
	styleUrls: ['dropdown.component.scss']
})
export class DropdownItem implements OnInit{

	@Input() set listaItems(data: ListaItems[]){
		// this._listaItems = data;
		this._listaItems = [
			{
				id: 1,
				titulo: 'primero'
			},
			{
				id: 2,
				titulo: 'segundo'
			},
			{
				id: 3,
				titulo: 'tercero'
			}
		];
	};
	get listaItems(){
		return this._listaItems;
	}

	private _listaItems: ListaItems[];

	constructor(){}
	ngOnInit(): void {
		//Called after the constructor, initializing input properties, and the first call to ngOnChanges.
		//Add 'implements OnInit' to the class.
		
	}

	public abrirDropdown(){
		console.log('hola')
	}
}