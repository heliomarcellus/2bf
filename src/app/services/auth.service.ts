import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MockAuthService } from './mock-auth.service';  // Importa o serviço de mock

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://177.140.220.91:8081/v3/api-docs';
  private tokenKey = 'authToken';
  private useMock = true;  // Flag para usar mock

  constructor(private http: HttpClient, private mockAuthService: MockAuthService) { }

  login(login: string, password: string): Observable<boolean> {
    if (this.useMock) {
      return this.mockAuthService.login(login, password);
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { login, password }, { headers })
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  logout(): void {
    if (this.useMock) {
      this.mockAuthService.logout();
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  getToken(): string | null {
    return this.useMock ? this.mockAuthService.getToken() : localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.useMock ? this.mockAuthService.isAuthenticated() : this.getToken() !== null;
  }
}
