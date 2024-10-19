import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../components/logout/logout.component';
import { AuthService } from '../services/auth.service';
import { MenuComponent } from '../components/menu/menu.component';
import { SaludoComponent } from '../components/saludo/saludo.component';
import { GraficosComponent } from '../components/graficos/graficos.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoutComponent, MenuComponent, SaludoComponent, GraficosComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  username:string | null=null;
  isAdmin:boolean=false;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.username= this.authService.getUsername();
    this.isAdmin=this.authService.isAdmin();
    console.log('isAdmin:', this.isAdmin);
  }

}
