import {HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
export const url = 'http://localhost:8080'
export const httOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};
export const httOptionsImage = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=------border'}),
};

export interface LoginResponse {
  "token": "",
  "type": "Bearer",
  "id": 0,
  "username": "",
  "refreshToken": "",
  "email": "",
  "role": [
    "USER_ROLE",
    "SELLER_ROLE"
  ],
  "user": User,
}

const requestToNotBeIntercepted = ['/signin', ' /refreshtoken', '/signup']

export function LoggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const auth = inject(AuthService)
  if (window.localStorage.getItem('loginResponse')) {
    const tokenSaved: LoginResponse = JSON.parse(window.localStorage.getItem('loginResponse') || "");
    const newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSaved.token),

    });
    console.log('new REq refresh ', newReq);
    return next(newReq).pipe(catchError((err) => {
      console.log('inside errrrr ', err);
      if ([401, 403].includes(err.status)) {

        if (err.status === 403) {
          const isRefresh = confirm('do you want to continue  ?');
          if (isRefresh) {
            console.log('new REq refresh ', newReq);
            auth.$refreshToken.next(true);
          }
        }
        //auth.signOut();
      }
      return throwError(err);
    }));
  } else {
    return next(req).pipe(catchError((err) => {
      if ([401, 403].includes(err.status)) {
        console.log('new REq  ', req);
        //auth.signOut();
      }
      return throwError(err);
    }));
  }

}

export interface Product {
  id: string
  name: string;
  price: string;
  description: string;
  category: string;
  productCategory: string;
  imageBytes: Uint8Array[];
}

export class User {
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  password: string;
  email: string;
  addresses: Array<Address>;

  constructor(
    firstName: string,
    lastName: string,
    userName: string,
    role: string,
    password: string,
    email: string,
    addresses: Array<Address>
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.role = role;
    this.password = password;
    this.email = email;
    this.addresses = addresses;
  }
}
export class Address {
  street: string;
  strNumber: string;
  postalCode: string;
  city: string;

  constructor(street: string, strNumber: string, postalCode: string, city: string) {
    this.street = street;
    this.strNumber = strNumber;
    this.postalCode = postalCode;
    this.city = city;
  }
}
