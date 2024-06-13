import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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

  login(form: NgForm) {
    // Verifique se o formulário é válido antes de tentar o login
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/ice-cream-order']); // Redirecionar para a página de pedidos de sorvete
      } else {
        alert('Login failed');
      }
    });
  }
}
