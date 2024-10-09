import {Component, inject} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  authServ =  inject(AuthService);
  signout() {

    this.authServ.signOut();
  }
}
