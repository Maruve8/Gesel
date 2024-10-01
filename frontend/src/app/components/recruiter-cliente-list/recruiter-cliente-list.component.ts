import { Component, OnInit } from '@angular/core';
import { RecruiterClienteService } from '../../services/recruiter-cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recruiter-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recruiter-cliente-list.component.html',
  styleUrl: './recruiter-cliente-list.component.css'
})
export class RecruiterClienteListComponent implements OnInit{

  relations:any[]=[];

  constructor(private RecruiterClienteService: RecruiterClienteService){

  }
  

  ngOnInit(): void {
    this.getAllRelations();
    
  }


  getAllRelations():void{
    this.RecruiterClienteService.getAllRelations().subscribe((data)=>{
      this.relations=data;
    });
  }


  deleteRelation(recruiterId:number, clienteId:number):void{
    this.RecruiterClienteService.deleteRelation(recruiterId, clienteId).subscribe(()=>{
      this.getAllRelations(); //actualiza la lista
    })
  }

}
