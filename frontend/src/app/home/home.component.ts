import { Component } from '@angular/core';
import { LogoutComponent } from '../components/logout/logout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
