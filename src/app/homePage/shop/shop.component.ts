import {Component, DestroyRef, inject} from '@angular/core';
import {NavBarComponent} from "../../nav-bar/nav-bar.component";
import {ProductService} from "../../product.service";
import {Product} from "../../consts";

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

  constructor() {
    const sub = this.productService.getAllProducts().subscribe({
      next: data => {
        console.log('products ',data)
        this.products= data
      }
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe())

  }

  convertToImageSrc(imageBytes: Uint8Array[]): string {
    console.log('image picture : ', imageBytes);
    return 'data:image/jpeg;base64,' + imageBytes;
  }
}
