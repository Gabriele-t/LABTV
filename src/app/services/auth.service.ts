import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoggedUser, LoginDto, RegisterDto } from '../models/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(model: LoginDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${environment.JSON_SERVER_BASE_URL}/login`, model)
  }

  register(model: RegisterDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${environment.JSON_SERVER_BASE_URL}/register`, model)
  }

  setLoggedUser(user: LoggedUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem('user')

    if (userStorage !== null) {
      let user: LoggedUser = JSON.parse(userStorage)
      return user
    }

    return null
  }
}