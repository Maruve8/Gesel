import { Component, OnInit } from '@angular/core';
import { RecruiterCandidatoService } from '../../services/recruiter-candidato.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-recruiter-candidato-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruiter-candidato-list.component.html',
  styleUrl: './recruiter-candidato-list.component.css'
})
export class RecruiterCandidatoListComponent implements OnInit{

  relations: any[]=[];

  constructor(private recruiterCandidatoService: RecruiterCandidatoService){}

  ngOnInit(): void {
    this.getAllRelations();
  }

  getAllRelations():void{
    this.recruiterCandidatoService.getAllRelations().subscribe((data)=>{
      this.relations=data;
    });
  }


  deleteRelation(recruiterId:number, candidatoId:number):void{
    this.recruiterCandidatoService.deleteRelation(recruiterId, candidatoId).subscribe(()=>{
      this.getAllRelations();
    });
  }

}
