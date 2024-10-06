import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {httOptions, LoginResponse, url} from "../consts";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpClient: HttpClient = inject(HttpClient);

  login(userName: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post(url + "/signin", {
      userName,
      password
    }, httOptions) as Observable<LoginResponse>;
  }

  constructor() {
  }
}
