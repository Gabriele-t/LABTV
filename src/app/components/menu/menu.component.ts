import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggedUser } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  loggedUser: LoggedUser | null = null;
  private authSubscription: Subscription;

  constructor (private authService: AuthService) {
    this.authSubscription = this.authService.loggedUserChanged.subscribe(user => {
      this.loggedUser = user;
    });
    this.loggedUser = this.authService.getLoggedUser()
  }

  logout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
