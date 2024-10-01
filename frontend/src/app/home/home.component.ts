import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../components/logout/logout.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  username:string | null=null;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.username= this.authService.getUsername();
  }

}
