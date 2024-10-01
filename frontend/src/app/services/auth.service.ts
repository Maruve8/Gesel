import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null; //almacena rol del usuario

  constructor() { 
    this.userRole = localStorage.getItem('userRole');
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN'; //devuelve true si es admin
  }

  logout(): void {
    localStorage.removeItem('userRole'); //eliminael rol del usuario del almacenamiento local
    
  }
}
