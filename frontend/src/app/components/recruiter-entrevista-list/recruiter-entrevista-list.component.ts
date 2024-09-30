import { Component, OnInit } from '@angular/core';
import { RecruiterEntrevistaService } from '../../services/recruiter-entrevista.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recruiter-entrevista-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruiter-entrevista-list.component.html',
  styleUrl: './recruiter-entrevista-list.component.css'
})
export class RecruiterEntrevistaListComponent implements OnInit{
  relations: any[]=[];

  constructor(private recruiterEntrevistaService: RecruiterEntrevistaService) {}


  ngOnInit(): void {
    this.getAllRelations();
  }


  getAllRelations(): void {
    this.recruiterEntrevistaService.getAllRelations().subscribe(data => {
      this.relations = data;
    });
  }

  deleteRelation(recruiterId: number, entrevistaId: number): void {
    this.recruiterEntrevistaService.deleteRelation(recruiterId, entrevistaId).subscribe(() => {
      this.getAllRelations(); //actualiza lista
    });
  }

}
