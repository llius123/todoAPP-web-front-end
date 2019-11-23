import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TodoComponent } from "./todo/todo.component";
import { LoginVerificationCanActivate } from "./global/loginVerification.service";
import { ListarTodoComponent } from "./todo/listar-todo/listar-todo.component";

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
				path: "inicio",
				component: ListarTodoComponent,
				canActivate: [LoginVerificationCanActivate]
			},
			{
				path: "**",
				redirectTo: "inicio"
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
