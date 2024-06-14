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
  private users: Array<{ name: string, email: string, cpf: string, password: string }> = [
    { name: 'User Test', email: this.validLogin, cpf: '12345678900', password: this.validPassword }
  ];  // Lista inicial de usuários com um usuário de teste

  login(email: string, password: string): Observable<boolean> {
    return of({ email, password }).pipe(
      delay(1000),
      map(credentials => {
        console.log('Attempting login with credentials:', credentials); // Log para verificar as credenciais de login
        const user = this.users.find(user => user.email === credentials.email && user.password === credentials.password);
        if (user) {
          console.log('Login successful for user:', user); // Log para verificar se o login foi bem-sucedido
          const token = 'mock-token';
          localStorage.setItem(this.tokenKey, token);
          return true;
        }
        console.log('Login failed for credentials:', credentials); // Log para verificar se o login falhou
        return false;
      })
    );
  }

  register(name: string, email: string, cpf: string, password: string): Observable<boolean> {
    return of({ name, email, cpf, password }).pipe(
      delay(1000),
      map(credentials => {
        console.log('Registering user with credentials:', credentials); // Log para verificar as credenciais de registro
        if (credentials.name && credentials.email && credentials.cpf && credentials.password) {
          this.users.push(credentials);  // Adiciona o novo usuário à lista de usuários
          const token = 'mock-token';
          localStorage.setItem(this.tokenKey, token);
          console.log('Current users after registration:', this.users); // Log para verificar a lista de usuários após o registro
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
