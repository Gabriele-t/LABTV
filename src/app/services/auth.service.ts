import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser, LoginDto, RegisterDto } from '../models/auth.model';

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

  purchase(userId: number, movieId: number, accessToken: string) {
    const data = { userId, movieId };
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.post(`${environment.JSON_SERVER_BASE_URL}/purchases`, data);
  }
}