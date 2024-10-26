import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {ShopComponent} from "./homePage/shop/shop.component";
import {inject} from "@angular/core";
import {LoginResponse} from "./consts";
import {SignupComponent} from "./auth/signup/signup.component";
import {UploadProductComponent} from "./upload-product/upload-product.component";

const loggedInGuard: CanMatchFn = (route, segments) => {
  const router: Router = inject(Router);
  if (window.localStorage.getItem('loginResponse')) {
    const tokenSaved: LoginResponse = JSON.parse(window.localStorage.getItem('loginResponse')!);
    if (tokenSaved.token !== "") {
      return true;
    }
  }
  return new RedirectCommand(router.parseUrl('/'));
}

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'shop',
    component: ShopComponent,
    title: 'Shop Home Page',
    canMatch: [loggedInGuard]
  },
  {
    path: 'uploadProduct',
    component: UploadProductComponent,
    title: 'Upload Product',
    canMatch: [loggedInGuard]
  }
]
