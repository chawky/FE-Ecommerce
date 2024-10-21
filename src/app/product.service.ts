import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {httOptions, Product, url} from "./consts";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient: HttpClient = inject(HttpClient);
  auth = inject(AuthService);
  router :Router = inject(Router);
  constructor() {

  }

  getAllProducts():Observable<Product[]>{
   return  this.httpClient.get<Product[]>(url + "/allProductData", httOptions)
  }
}
