import { Component } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css'
})
export class UploadProductComponent {

}
