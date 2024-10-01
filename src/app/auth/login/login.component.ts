import {afterNextRender, Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {debounce, debounceTime} from "rxjs";

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
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(2), Validators.required, mustHaveQuestionMark]
    }),
  });


  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('emails');
    if (savedForm) {
      console.log('fdsfsdf '+ savedForm)
        this.form.patchValue({
          email: JSON.parse(savedForm)
        })

    }
    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => window.localStorage.setItem('emails', JSON.stringify(this.form.value.email))
    })
  }

  constructor() {
  }

  get emailInvalid()
    :
    boolean {
    return this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get pwInvalid()
    :
    boolean {
    return this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  onSubmit() {
    console.log(this.form.value.email);
    this.form.reset();
  }
}
