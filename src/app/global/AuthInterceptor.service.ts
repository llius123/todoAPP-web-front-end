import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
	constructor(
		private readonly _loginService: LoginService,
		private readonly _router: Router
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token: string = this._loginService.token;
		let request = req;
		if (token || request.url.includes("login")) {
			if (token) {
				request = req.clone({
					setHeaders: {
						authorization: token
					}
				});
			} else {
				request = req.clone();
			}
			return next.handle(request);
		} else {
			this._router.navigate(["login"]);
		}
	}
}
