import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../todo.service';
import { TodoInterface } from 'src/app/components/todo/todo-list/todo-list.component';

@Component({
  selector: 'edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

	constructor(
		private _todoService: TodoService
	) {
		this._todoService.todo.subscribe(resp => {
			this.todo = resp;
			this.formdata = new FormGroup({ 
				id: new FormControl(this.todo.id),
				titulo: new FormControl(this.todo.titulo),
				descripcion: new FormControl(this.todo.descripcion),
				tag: new FormControl(this.todo.tag),
				orden: new FormControl(this.todo.orden),
				completado: new FormControl(this.todo.completado),
			});
		})
	}

	public todo: TodoInterface;
	public formdata: FormGroup;
	ngOnInit(): void {
		this.formdata = new FormGroup({ 
			id: new FormControl(),
			titulo: new FormControl(),
			descripcion: new FormControl(),
			orden: new FormControl(),
			completado: new FormControl(),
		});
	}

	public guardar() {
		this._todoService.editarSimpleTodo(this.formdata.getRawValue()).subscribe(
			resp => {
				console.log(resp)
				this._todoService.todoEditado.emit(this.formdata.getRawValue())
			},
			error => {
				console.log(error)
			}
		)
	}


}
