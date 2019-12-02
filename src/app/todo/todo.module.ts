import { TodoListModule } from "./../components/todo/todo.module";
import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo.component";
import { TodoService } from "./todo.service";
import { BrowserModule } from "@angular/platform-browser";
import { ListarTodoComponent } from "./listar-todo/listar-todo.component";
import { EditTodoComponent } from "./edit-todo/edit-todo.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SvgService } from "../global/svg.service";
import { AppRoutingModule } from "../app-routing.module";
import { TodoProyectoComponent } from './proyecto/todo-proyecto.component';
import { ProyectoModule } from '../components/proyecto/proyecto.module';

@NgModule({
	declarations: [TodoComponent, ListarTodoComponent, EditTodoComponent, TodoProyectoComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ReactiveFormsModule,
		TodoListModule,
		ProyectoModule
	],
	providers: [TodoService, SvgService],
	bootstrap: []
})
export class TodoModule {}
