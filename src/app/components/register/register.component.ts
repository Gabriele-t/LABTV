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
  confirmPassword = ''

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.model).subscribe({
      next: (loggedUser) => {
        this.authService.setLoggedUser(loggedUser);
        this.router.navigate(['']);
      }
    });
  }

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { 'passwordMismatch': true }
    : null;
}
}
