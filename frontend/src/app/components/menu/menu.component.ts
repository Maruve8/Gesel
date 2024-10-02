import { Component } from '@angular/core';
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
export class MenuComponent {
  username:string | null;

  constructor(private router: Router, private authService: AuthService){
    this.username=localStorage.getItem('username');
  }

  

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
