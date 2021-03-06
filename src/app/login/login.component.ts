import { FormGroup, FormControlName, FormControl } from "@angular/forms";
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	constructor(private _loginService: LoginService, private _route: Router) {}
	ngOnInit(): void {
		this.loginForm = new FormGroup({
			user: new FormControl(),
			pass: new FormControl()
		});
	}
	public loginForm: FormGroup;
	public login() {
		this._loginService
			.login(this.loginForm.get("user").value, this.loginForm.get("pass").value)
			.subscribe(resp => {
				this._loginService.token = resp.access_token;
				this._loginService.user = this._loginService.decodeToken();
				localStorage.setItem("acces_token", resp.access_token);
				this._route.navigate(["todo"]);
			});
	}
}
