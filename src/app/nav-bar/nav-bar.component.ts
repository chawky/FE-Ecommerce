import {Component, inject} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  authServ =  inject(AuthService);
  router =  inject(Router);
  signout() {

    this.authServ.signOut();
  }

  gotToUpload() {
    this.router.navigate(['/uploadProduct']);
  }
}
