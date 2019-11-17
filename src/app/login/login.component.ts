import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	@ViewChild('user', {static: false}) user: ElementRef;
	@ViewChild('pass', {static: false}) pass: ElementRef;

	constructor (private _loginService: LoginService, private _route: Router) {}

	public login() {
		this._loginService.login(this.user.nativeElement.value, this.pass.nativeElement.value).subscribe(
			resp => {
				this._loginService.token = resp.access_token;
				this._loginService.user = this._loginService.decodeToken()
				localStorage.setItem('acces_token', resp.access_token)
				this._route.navigate(['todo'])
			}
		)
	}
}
