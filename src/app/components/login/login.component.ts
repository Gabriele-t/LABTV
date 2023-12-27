import { Component } from '@angular/core';
import { LoginDto } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model = new LoginDto

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.model)
    .subscribe(loggedUser => console.log(loggedUser));
  }
}
