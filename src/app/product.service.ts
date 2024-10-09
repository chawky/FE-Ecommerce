import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {httOptions, Product, url} from "./consts";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpClient: HttpClient = inject(HttpClient);
  router :Router = inject(Router);
  constructor() { }
  getAllProducts():Observable<Product[]>{
   return  this.httpClient.get<Product[]>(url + "/allProductData", httOptions)
  }
}
