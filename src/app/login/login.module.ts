import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [LoginComponent],
	imports: [ReactiveFormsModule],
	providers: [LoginService],
	bootstrap: []
})
export class LoginModule {}
