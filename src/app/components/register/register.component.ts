import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  cpf: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.authService.register(this.name, this.email, this.cpf, this.password).subscribe(success => {
      if (success) {
        alert('Registro concluído com sucesso!');
        this.router.navigate(['/login']);
      } else {
        alert('Ocorreu um erro durante o registro. Por favor, tente novamente.');
      }
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
