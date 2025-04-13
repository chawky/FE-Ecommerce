import { CartService } from './../cart.service';
import {
  Component,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../consts';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnChanges {
  authServ = inject(AuthService);
  router = inject(Router);
  productToCart = input<Product[]>();
  cartService = inject(CartService);
  notificationCount = signal<number>(this.productToCart.length);
  signout() {
    this.authServ.signOut();
  }

  gotToUpload() {
    this.router.navigate(['/uploadProduct']);
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.notificationCount.update(
    //   () => changes['productToCart']?.currentValue.length
    // );
    this.notificationCount.update(
      () => this.cartService.getCartProducts().length
    );
  }
}
