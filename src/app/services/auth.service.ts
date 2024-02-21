import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, catchError, map, mergeMap, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser, LoginDto, Purchase, RegisterDto } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUserChanged = new Subject<LoggedUser | null>();

  constructor(private http: HttpClient, private router: Router) { }

  login(model: LoginDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${environment.JSON_SERVER_BASE_URL}/login`, model)
  }

  register(model: RegisterDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(`${environment.JSON_SERVER_BASE_URL}/register`, model)
  }

  setLoggedUser(user: LoggedUser) {
    localStorage.setItem('user', JSON.stringify(user))
    this.loggedUserChanged.next(user);
  }

  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem('user')

    if (userStorage !== null) {
      let user: LoggedUser = JSON.parse(userStorage)
      return user
    }

    return null
  }

  logout() {
    localStorage.removeItem('user')
    this.loggedUserChanged.next(null);
  }

  hasPurchasedMovie(userId: number, movieId: number): Observable<boolean> {
    const authToken = this.getAuthToken();
    if (!authToken) {
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.get<[]>(`${environment.JSON_SERVER_BASE_URL}/purchases?userId=${userId}&movieId=${movieId}`, { headers }).pipe(
      map(purchases => purchases.length > 0)
    );
  }

  private getAuthToken(): string | null {
    let userStorage = localStorage.getItem('user');
    if (userStorage !== null) {
      let user: LoggedUser = JSON.parse(userStorage);
      return user.accessToken;
    }
    return null;
  }

  purchase(movieId: number, poster_path: string) {
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

      const purchaseData = { userId, movieId, poster_path };

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

  isTokenExpired(token: string): boolean {
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

  redirectToLoginPage(message?: string) {
    this.router.navigate(['/login'], { queryParams: { message: message } });
  }

  returnMovie(movieId: number) {
    const loggedUser = this.getLoggedUser();
    if (!loggedUser) {
      console.error('Utente non autenticato');
      return throwError(() => new Error('Utente non autenticato'));
    }

    const userId = loggedUser.user.id;
    const accessToken = loggedUser.accessToken;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.get<Purchase[]>(`${environment.JSON_SERVER_BASE_URL}/purchases?userId=${userId}&movieId=${movieId}`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error)),
        mergeMap((purchase: Purchase[]) => {
          if (!purchase) {
            console.error('Acquisto non trovato per il film specificato');
            return throwError(() => new Error('Acquisto non trovato per il film specificato'));
          }

          return this.http.delete(`${environment.JSON_SERVER_BASE_URL}/purchases/${purchase[0].id}`, { headers });
        }),
        catchError((error: HttpErrorResponse) => throwError(() => error))
      );
  }

  getPurchases(userId: number): Observable<Purchase[]> {
    const authToken = this.getAuthToken();
    if (!authToken) {
      return throwError(() => new Error('Token di accesso non disponibile'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.get<Purchase[]>(`${environment.JSON_SERVER_BASE_URL}/purchases?userId=${userId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Errore durante il recupero degli acquisti:', error);
        return throwError(() => error);
      })
    );
  }
}