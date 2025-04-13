import { Injectable, signal } from '@angular/core';
import { Product } from './consts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts = signal<Product[]>([]);

  setCartProducts(products: Product[]) {
    this.cartProducts.set(products);
  }
  getCartProducts() {
    return this.cartProducts();
  }
  constructor() {}
}
