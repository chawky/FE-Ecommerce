import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httOptions, LoginResponse, url} from "./consts";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  router :Router = inject(Router);
  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();
  login(userName: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post(url + "/signin", {
      userName,
      password
    }, httOptions) as Observable<LoginResponse>;
  }

  constructor() {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    });
  }
  getRefreshToken() {
    const token: LoginResponse  = JSON.parse(localStorage.getItem('loginResponse')!);
    console.log('inside : getRefreshToken ', JSON.stringify(token));
    return this.httpClient
    .post(
      url  + `/refreshtoken`,
      { refreshToken: token.refreshToken },
      httOptions
    )
    .subscribe((res: any) => {
      if (res) {
        localStorage.setItem('loginResponse', JSON.stringify(res));
        this.$refreshTokenReceived.next(true);
      }
    });
  }
  signOut() {
    window.localStorage.removeItem("loginResponse");
    window.localStorage.clear()
    this.router.navigate(['/']);
  }
}
