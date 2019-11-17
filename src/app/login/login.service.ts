import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UserInterface } from '../entity/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginService {

	constructor(private httpClient: HttpClient) {}

	/**
	 * Token jwt
	 */
	private _token: string;
	get token(): string {
		return this._token;
	}
	set token(token: string) {
		this._token = token;
	}

	/**
	 * Usuario logged
	 */
	private _user: UserInterface;
	get user(): UserInterface {
		return this._user;
	}
	set user(user: UserInterface) {
		this._user = user;
	}

	/**
	 * Decodificar el token 
	 */
	private helper = new JwtHelperService();
	public decodeToken() {
		return this.helper.decodeToken(this._token);
	}

	public login(user: string, pass: string): Observable<{access_token: string}>{
		const params = new HttpParams().append('user', user).append('pass', pass)
		return this.httpClient.get<{access_token: string}>(environment.apiPath + 'login' , {params: params})
	}
}