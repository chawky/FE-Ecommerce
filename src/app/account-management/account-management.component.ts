import {Component, input, OnInit} from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {LoginResponse, User} from "../consts";
import {window} from "rxjs";

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.css'
})
export class AccountManagementComponent implements OnInit {
  profile: User | undefined;

  ngOnInit(): void {
    const token: LoginResponse  = JSON.parse(localStorage.getItem('loginResponse')!);
    console.log(token.user);
    this.profile= token.user ;
  }


}
