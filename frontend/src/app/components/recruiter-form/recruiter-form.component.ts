import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruiterService } from '../../services/recruiter.service';
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
    private router: Router
  ) { }

  ngOnInit(): void {
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
}
