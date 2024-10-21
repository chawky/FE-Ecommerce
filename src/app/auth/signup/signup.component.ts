import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {SignUpService} from "../../sign-up.service";
import {Address, User} from "../../consts";
import {Router} from "@angular/router";

function samePw(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmpw = control.get('confirmPw')?.value;

  if (password === confirmpw) {
    return null;
  }
  return {notsamePw: true}
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class SignupComponent  {
  router = inject(Router);
  signUpService = inject(SignUpService)
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPw: new FormControl('', [Validators.required]),
    }, {
      validators:[samePw]
    }),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      strNumber: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    role: new FormControl<'SELLER_ROLE' | 'USER_ROLE'>('USER_ROLE', [Validators.required]),
    agree: new FormControl(false, [Validators.required]),
  })

  constructor(){
    this.form.get('agree')?.valueChanges.subscribe((value) => {
    });

  }
  isDisabled() {
    return this.form.invalid || !this.form.get('agree')?.value;
  }

  get emailInvalid(): boolean {
    return this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get pwInvalid(): boolean {
    return this.form.controls.passwords.controls.password.touched && this.form.controls.passwords.controls.password.invalid
  }

  onSubmit() {
    let user : User = new User(
      this.form.controls.firstName.value!,
        this.form.controls.lastName.value!,
        this.form.controls.userName.value!,
        this.form.controls.role.value!,
        this.form.controls.passwords.controls.password.value!,
        this.form.controls.email.value!,
        [new Address(
          this.form.controls.address.controls.street.value!,
          this.form.controls.address.controls.strNumber.value!.toString(),
          this.form.controls.address.controls.postalCode.value!,
          this.form.controls.address.controls.city.value!
        )]
    );
    this.signUpService.signup(user).subscribe({
      next: (result) => {
        console.log(result);
        if(result !== undefined && result!== null){
          window.localStorage.setItem('loginResponse', JSON.stringify(result));
          this.router.navigate(['/shop']);
        }
      },
      error:err => {
        console.log(err);
        window.alert(err.error.message);
      }
    })
  }

  onReset() {
    this.form.reset()
  }

}
