import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser, LoginDto, Purchase, RegisterDto } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

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

  purchase(movieId: number) {
    const loggedUser = this.getLoggedUser();

    if (loggedUser) {
      if (this.isTokenExpired(loggedUser.accessToken)) {
        const errorMessage = 'Il token di accesso è scaduto. Effettua nuovamente l\'accesso.';
        console.error(errorMessage);
        this.redirectToLoginPage(errorMessage);
        return new Observable();
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${loggedUser.accessToken}`);
      const userId = loggedUser.user.id;

      const purchaseData = { userId, movieId };

      return this.http.post(`${environment.JSON_SERVER_BASE_URL}/purchases`, purchaseData, { headers })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Errore durante l\'acquisto:', error);
            return throwError(() => error);
          })
        );
    } else {
      console.error('Token di accesso non disponibile');
      this.redirectToLoginPage()
      return new Observable();
    }
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    const tokenData = this.decodeToken(token);

    if (!tokenData || !tokenData.exp) return true;

    const expirationDate = new Date(tokenData.exp * 1000);

    return expirationDate <= new Date();
  }

  private decodeToken(token: string) {
    try {
      const decodedToken = atob(token.split('.')[1]);
      return JSON.parse(decodedToken);
    } catch (error) {
      console.error('Errore durante la decodifica del token:', error);
      return null;
    }
  }

  private redirectToLoginPage(message?: string) {
    this.router.navigate(['/login'], { queryParams: { message: message } });
  }
}