import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CandidatoListComponent } from '../candidato-list/candidato-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CandidatoListComponent, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  username:string | null;
  isAdmin: boolean=false;//verificar si es admin

  constructor(private router: Router, private authService: AuthService){
    this.username=localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.isAdmin=this.authService.isAdmin();
    console.log('isAdmin: ', this.isAdmin);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
