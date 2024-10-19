import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruiterService } from '../../services/recruiter.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruiter-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recruiter-form.component.html',
  styleUrl: './recruiter-form.component.css'
})
export class RecruiterFormComponent implements OnInit {
  recruiter: any = {
    nombre: '',
    apellidos: ''
  };
  isEditMode = false;
  recruiterId: number | null = null;

  constructor(
    private recruiterService: RecruiterService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //verificar si es el admin
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']); //al home si no es el admin
    }
    this.route.params.subscribe(params => {
      this.recruiterId = params['id'];
      if (this.recruiterId) {
        this.isEditMode = true;
        this.recruiterService.getRecruiter(this.recruiterId).subscribe(data => {
          this.recruiter = data;
        });
      }
    });
  }


  saveRecruiter(): void {
    if (this.isEditMode) {
      this.recruiterService.updateRecruiter(this.recruiterId!, this.recruiter).subscribe(() => {
        this.router.navigate(['/recruiters']);
      });
    } else {
      this.recruiterService.createRecruiter(this.recruiter).subscribe(() => {
        this.router.navigate(['/recruiters']);
      });
    }
  }

  //volver
  goBack():void{
    this.router.navigate(['/recruiters']);
  }
}
