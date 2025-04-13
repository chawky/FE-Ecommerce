import { CartService } from './../../cart.service';
import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ProductService } from '../../product.service';
import { LoginResponse, Product } from '../../consts';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  products: Product[] = [];
  productsTosend = signal<Product[]>([]);
  destroyRef = inject(DestroyRef);
  private auth = inject(AuthService);
  role: LoginResponse = JSON.parse(
    window.localStorage.getItem('loginResponse')!
  );

  constructor() {
    this.getAllProducts();
    this.auth.$refreshTokenReceived.subscribe((res) => {
      this.getAllProducts();
    });
  }
  convertToImageSrc(imageBytes: Uint8Array[]): string {
    return 'data:image/jpeg;base64,' + imageBytes;
  }

  private getAllProducts() {
    const sub = this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('products ', data);
        this.products = data;
      },
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        if (data) {
          this.products = data;
        }
      },
    });
  }

  addToCart(product: Product) {
    this.productsTosend.update((products) => [
      ...this.cartService.getCartProducts(),
      product,
    ]);
    this.cartService.setCartProducts(this.productsTosend());
  }
}
