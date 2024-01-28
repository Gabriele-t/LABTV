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

  isMovieAlreadyPurchased(userId: number, movieId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.JSON_SERVER_BASE_URL}/purchases/check?userId=${userId}&movieId=${movieId}`
    );
  }

  purchase(userId: number, movieId: number) {
    return this.getAllPurchases()
      .pipe(
        map((purchases) => {
          const isAlreadyPurchased = purchases.some((purchase) => purchase.userId === userId && purchase.movieId === movieId);

          if (isAlreadyPurchased) {            
            return throwError(() => new Error('Il film è già stato acquistato.'));
          }          

          return this.http.post(`${environment.JSON_SERVER_BASE_URL}/purchases`, { userId, movieId });
        })
      );
  }

  private getAllPurchases() {
    return this.http.get<Purchase[]>(`${environment.JSON_SERVER_BASE_URL}/purchases`);
  }
}