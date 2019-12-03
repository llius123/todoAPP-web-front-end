import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TodoComponent } from "./todo/todo.component";
import { LoginVerificationCanActivate } from "./global/loginVerification.service";
import { ListarTodoComponent } from "./todo/listar-todo/listar-todo.component";
import { TodoProyectoComponent } from './todo/proyecto/todo-proyecto.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full"
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "todo",
		component: TodoComponent,
		children: [
			{
				path: "proyecto",
				component: TodoProyectoComponent,
				canActivate: [LoginVerificationCanActivate],
			},
			{
				path: "proyecto/:id",
				component: ListarTodoComponent,
				canActivate: [LoginVerificationCanActivate]
			},
			{
				path: "**",
				redirectTo: "proyecto"
			}
		]
	},
	{
		path: "**",
		redirectTo: "login"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
