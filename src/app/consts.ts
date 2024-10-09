import {HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const url = 'http://localhost:8080'
export const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

export interface LoginResponse {
  "token": "",
  "type": "Bearer",
  "id": 0,
  "username": "",
  "refreshToken": "",
  "email": "",
  "role": [
    "USER_ROLE"
  ]
}

const requestToNotBeIntercepted = ['/signin/gi', ' /refreshtoken/gi', '/signup/gi']

export function LoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth = inject(AuthService)
  if (window.localStorage.getItem('loginResponse')) {
    const tokenSaved: LoginResponse = JSON.parse(window.localStorage.getItem('loginResponse') || "");

    // const newReq = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${tokenSaved.token}`,
    //   },
    // });
    const newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSaved.token),

    });
    return next(newReq).pipe(catchError((err) => {
      if ([401, 403].includes(err.status)) {
        console.log('saved token   ',tokenSaved);
        console.log('new REq  ',newReq);
        //auth.signOut();
      }
      return throwError(err);
    }));
  } else {
    return next(req).pipe(catchError((err) => {
      if ([401, 403].includes(err.status)) {
        //auth.signOut();
      }
      return throwError(err);
    }));
  }

}
export interface Product {
  id:string
  name: string;
  price: string;
  description: string;
  category: string;
  productCategory: string;
  imageBytes: Uint8Array[];
}
