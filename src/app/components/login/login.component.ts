import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginDto } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model = new LoginDto
  errorMessage: string = '';
  
  constructor(private authService: AuthService, private location: Location, private activatedRoute: ActivatedRoute) { }

  // All'interno del componente della pagina di login
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.errorMessage = params['message'];
    });
  }
  
  login() {
    this.authService.login(this.model)
      .subscribe(loggedUser => {
        this.authService.setLoggedUser(loggedUser)
        this.location.back();
      })
  }
}
