import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {debounceTime} from "rxjs";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

function mustHaveQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return {noQuestionMark: true}
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(2), Validators.required]
    }),
  });
  destroyRef = inject(DestroyRef);
  loginService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  get emailInvalid(): boolean {
    return this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get pwInvalid(): boolean {
    return this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  onSubmit() {
    if (!this.form.invalid && this.form.value.email && this.form.value.password) {
      const res = this.loginService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (result) => {
          window.localStorage.setItem('loginResponse', JSON.stringify(result));
          if (result.token.length !== 0) {
            console.log(result);
            this.router.navigate(['/shop']);
          }
        }
      });
      this.destroyRef.onDestroy(() => {
        res.unsubscribe();
      })
    }
    this.form.reset();
  }
}
