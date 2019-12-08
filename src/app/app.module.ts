import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TodoModule } from "./todo/todo.module";
import { LoginVerificationCanActivate } from "./global/loginVerification.service";
import { AuthInterceptorService } from "./global/AuthInterceptor.service";
import { ComponentModule } from "./components/components.module";
import { UtilsService } from "./global/utils.service";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LoginModule,
		HttpClientModule,
		TodoModule,
		ComponentModule
	],
	providers: [
		LoginVerificationCanActivate,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		},
		UtilsService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
