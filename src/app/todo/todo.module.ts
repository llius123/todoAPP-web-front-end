import { TodoListModule } from './../components/todo/todo.module';
import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentModule } from '../components/components.module';
import { ListarTodoComponent } from './listar-todo/listar-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

@NgModule({
  declarations: [
	TodoComponent,
	ListarTodoComponent,
	EditTodoComponent
  ],
  imports: [
	BrowserModule,
	TodoListModule
  ],
  providers: [TodoService],
  bootstrap: []
})
export class TodoModule { }
