import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model = new RegisterDto

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.model).subscribe(
      loggedUser => {
        this.authService.setLoggedUser(loggedUser)
        this.router.navigate([''])
      }
    )
  }
}
