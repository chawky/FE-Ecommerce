import { CartService } from './../cart.service';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../consts';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnChanges {
  payment(_t4: Product) {
    throw new Error('Method not implemented.');
  }
  deleteProduct(_t4: Product) {
    throw new Error('Method not implemented.');
  }
  products: Product[] = [];
  CartService = inject(CartService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log(
        'Products input has changed:',
        changes['products'].currentValue
      );
    }
  }

  ngOnInit(): void {
    this.products = this.CartService.getCartProducts();
  }
  convertToImageSrc(imageBytes: Uint8Array[]): string {
    return 'data:image/jpeg;base64,' + imageBytes;
  }
}
