import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httOptions, LoginResponse, url} from "./consts";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  router :Router = inject(Router);

  login(userName: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post(url + "/signin", {
      userName,
      password
    }, httOptions) as Observable<LoginResponse>;
  }

  constructor() {
  }

  signOut() {
    window.localStorage.removeItem("loginResponse");
    window.localStorage.clear()
    this.router.navigate(['/']);
  }
}
