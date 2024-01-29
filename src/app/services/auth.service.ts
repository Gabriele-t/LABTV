import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser, LoginDto, Purchase, RegisterDto } from '../models/auth.model';

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

  hasPurchasedMovie(userId: number, movieId: number): Observable<boolean> {
    return this.http.get<[]>(`${environment.JSON_SERVER_BASE_URL}/purchases?userId=${userId}&movieId=${movieId}`).pipe(
      map(purchases => purchases.length > 0)
    );
  }

  purchase(userId: number, movieId: number) {
    const purchaseData = { userId, movieId };
    return this.http.post(`${environment.JSON_SERVER_BASE_URL}/purchases`, purchaseData);
  }
}