import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {httOptions, url, User} from "./consts";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
httpClient=inject(HttpClient);
  signup(credentials: User): Observable<any> {
    return this.httpClient.post(
      url + `/signup`,
      credentials,
      httOptions
    );
  }
  constructor() { }
}
