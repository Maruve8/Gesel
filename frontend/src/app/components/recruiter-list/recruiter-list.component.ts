import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../services/recruiter.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor

@Component({
  selector: 'app-recruiter-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recruiter-list.component.html',
  styleUrl: './recruiter-list.component.css'
})
export class RecruiterListComponent implements OnInit{
  recruiters: any[] =[];

  constructor(private recruiterService: RecruiterService){}

  ngOnInit(): void {
    this.getRecruiters();
  }

  getRecruiters(): void {
    this.recruiterService.getRecruiters().subscribe((data)=>{
      console.log('Recruiters received:', data);  // Log para verificar los datos
      this.recruiters =data;
    });
  }

  deleteRecruiter(id:number): void {
    this.recruiterService.deleteRecruiter(id).subscribe(()=>{
      this.getRecruiters(); //para actualizar la lista
    })
  }
}
