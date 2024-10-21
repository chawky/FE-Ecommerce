import {Component, DestroyRef, inject} from '@angular/core';
import {NavBarComponent} from "../../nav-bar/nav-bar.component";
import {ProductService} from "../../product.service";
import {Product} from "../../consts";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  productService = inject(ProductService);
  products: Product[]=[]
  destroyRef =  inject(DestroyRef)
  private auth  = inject(AuthService);

  constructor() {
    this.getAllProducts()
    this.auth.$refreshTokenReceived.subscribe((res) => {
      this.getAllProducts();
    });


  }

  convertToImageSrc(imageBytes: Uint8Array[]): string {
    return 'data:image/jpeg;base64,' + imageBytes;
  }

  private getAllProducts() {
    const sub = this.productService.getAllProducts().subscribe({
      next: data => {
        console.log('products ',data)
        this.products= data
      }
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe())
  }
}
