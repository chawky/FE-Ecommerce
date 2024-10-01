import {Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

function samePw(control: AbstractControl) {
  const password = control.get('password')?.value
  const confirmpw = control.get('confirmPw')?.value
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
export class SignupComponent {
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
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      strNumber: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', [Validators.required]),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, [Validators.required]),
  })

  get emailInvalid(): boolean {
    return this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get pwInvalid(): boolean {
    return this.form.controls.passwords.controls.password.touched && this.form.controls.passwords.controls.password.invalid
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid')
    }
    console.log(this.form)
  }

  onReset() {
    this.form.reset()
  }
}
