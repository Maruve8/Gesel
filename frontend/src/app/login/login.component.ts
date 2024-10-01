import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post('/api/login', loginData, { headers, observe: 'response', responseType: 'text' }).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log('Login successful');
          const userRole = this.username === 'admin' ? 'ADMIN' : 'USER'; //establecer el rol 
          localStorage.setItem('userRole', userRole); //guardar el rol en localstorage
          this.router.navigate(['/home']); // Redirección al home después de loguearse
        } else {
          console.error('Inicio de Sesión fallido', response);
        }
      },
      error: (error) => {
        console.error('Inicio de Sesión fallido', error);
      },
      complete: () => {
        console.log('Completado');
      }
    });
  }
}


