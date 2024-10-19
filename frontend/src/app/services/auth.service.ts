import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null; //almacena rol del usuario
  private username:string | null=null; //almacenar el username

  constructor() { 
    this.userRole = localStorage.getItem('userRole');
    this.username= localStorage.getItem('username'); //cargar el username
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN'; //devuelve true si es admin
  }

  //método para obtener el nombre de usuario
  getUsername(): string | null{
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('userRole'); //eliminael rol del usuario del almacenamiento local
    localStorage.removeItem('username'); 
    
  }
}

