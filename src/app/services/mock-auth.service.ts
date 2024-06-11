import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private readonly validLogin = 'primeiro.teste@gmail.com';
  private readonly validPassword = 'klkoij';
  private tokenKey = 'authToken';

  login(login: string, password: string): Observable<boolean> {
    return of({ login, password }).pipe(
      delay(1000),
      map(credentials => {
        if (credentials.login === this.validLogin && credentials.password === this.validPassword) {
          const token = 'mock-token';
          localStorage.setItem(this.tokenKey, token);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
