import {Component, inject} from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [
    NavBarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.css'
})
export class UploadProductComponent {

  productService = inject(ProductService)
  auth = inject(AuthService)
  productForm = new FormGroup({
    title: new FormControl
    (
      ''
      , {
        validators: [Validators.required]
      }
    ),
    description: new FormControl('', {
      validators: [Validators.required]
    }),
    category:
      new FormControl('', {
        validators: [Validators.required]
      }),
    price:
      new FormControl(0, {
        validators: [Validators.required, Validators.min(0)]
      }),

    file:
      new FormControl()
  });
  private router = inject(Router);

  constructor() {
    this.auth.$refreshTokenReceived.subscribe((res) => {
      this.productService.getAllProducts();
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {
      console.log(this.productForm.value);
      this.productService.uploadProduct( this.productForm.controls['title'].value!,
        this.productForm.controls['category'].value!,
        this.productForm.controls['description'].value!,
        this.productForm.controls['price'].value!,
        this.productForm.controls['file'].value!
      ).subscribe({
        next: (result) => {
          if(result){
            this.router.navigateByUrl('/shop');
          }
        },
        error: err => {
          console.log(err);
        }
      })
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Get the first selected file
      this.productForm.patchValue({
        file: file // Update the form control with the File object
      });
    }
  }


}
