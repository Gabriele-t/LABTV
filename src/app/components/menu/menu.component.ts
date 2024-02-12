import { Component } from '@angular/core';
import { LoggedUser } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  loggedUser: LoggedUser | null = this.authService.getLoggedUser();

  constructor (private authService: AuthService) {}
}
