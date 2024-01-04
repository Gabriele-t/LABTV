import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model = new LoginDto

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.model)
    .subscribe(loggedUser => {
      this.authService.setLoggedUser(loggedUser)
      this.router.navigate([''])
    })
  }
}
