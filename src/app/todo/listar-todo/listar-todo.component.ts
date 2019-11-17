import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/components/todo/todo-list/todo-list.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'listar-todo',
  templateUrl: './listar-todo.component.html',
  styleUrls: ['./listar-todo.component.scss']
})
export class ListarTodoComponent implements OnInit {

	public todoList: TodoInterface[];
	public editTodo: TodoInterface;
	constructor( private _todoService: TodoService) {
	}

	ngOnInit(): void {
		this.getAllTodo();
	}
	public getAllTodo() {
		this._todoService.getTodoList().subscribe(todo => {this.todoList = todo})
	}
	public drag($event: {orden: [{id: number, orden: number}], todos: TodoInterface[]}){
		this._todoService.actualizarOrden($event.orden).subscribe(
			resp => {
				//TODO
			},
			error => {
				//TODO
			}
		)
	}
	public editarSimpleTodo($event: TodoInterface) {
		this._todoService.editarSimpleTodo($event).subscribe(
			resp => {
				console.log(resp)
			},
			error => {
				console.log(error)
			}
		)
	}
}
