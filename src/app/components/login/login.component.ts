import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/ice-cream-order']); // Redirecionar para a página de pedidos de sorvete
      } else {
        alert('Login failed');
      }
    });
  }
}
