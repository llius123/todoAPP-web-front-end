import { TodoListModule } from "./../components/todo/todo.module";
import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo.component";
import { TodoService } from "./todo.service";
import { BrowserModule } from "@angular/platform-browser";
import { ListarTodoComponent } from "./listar-todo/listar-todo.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SvgService } from "../global/svg.service";
import { AppRoutingModule } from "../app-routing.module";
import { TodoProyectoComponent } from "./proyecto/todo-proyecto.component";
import { ProyectoModule } from "../components/proyecto/proyecto.module";
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { ModalTagModule } from '../components/modal/modal-tag.module';

@NgModule({
	declarations: [TodoComponent, ListarTodoComponent, TodoProyectoComponent, BreadcrumComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ReactiveFormsModule,
		TodoListModule,
		ProyectoModule,
		ModalTagModule
	],
	providers: [TodoService, SvgService],
	bootstrap: []
})
export class TodoModule {}
