import { Injectable } from "@angular/core";
import {
	CanLoad,
	Route,
	UrlSegment,
	CanActivate,
	Router
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";
@Injectable({
	providedIn: "root"
})
export class LoginVerificationCanActivate implements CanActivate {
	constructor(private route: Router, private _loginService: LoginService) {}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (localStorage.getItem("acces_token") == null) {
			this.route.navigate(["login"]);
		} else {
			this._loginService.token = localStorage.getItem("acces_token");
			this._loginService.user = this._loginService.decodeToken();
			return true;
		}
	}
}
