import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {httOptions, httOptionsImage, Product, url} from "./consts";
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

  uploadProduct(title: string,
                category: string,
                description: string,
                price: number,
                file: File){
    const formData: FormData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price.toString()); // Convert to string
    formData.append('file', file, file.name);

    return this.httpClient.post(url + "/saveProduct",formData)

  }
}
