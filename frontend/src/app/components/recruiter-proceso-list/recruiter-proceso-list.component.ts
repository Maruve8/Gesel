import { Component, OnInit } from '@angular/core';
import { RecruiterProcesoService } from '../../services/recruiter-proceso.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recruiter-proceso-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruiter-proceso-list.component.html',
  styleUrl: './recruiter-proceso-list.component.css'
})
export class RecruiterProcesoListComponent implements OnInit{

relations: any[]=[];

constructor(private recruiterProcesoService: RecruiterProcesoService) { }


ngOnInit(): void {
  this.getAllRelations();
}

getAllRelations(): void {
  this.recruiterProcesoService.getAllRelations().subscribe((data) => {
    this.relations = data;
  });
}

deleteRelation(recruiterId: number, procesoId: number): void {
  this.recruiterProcesoService.deleteRelation(recruiterId, procesoId).subscribe(() => {
    this.getAllRelations(); //actualizar la lista
  });
}

}
