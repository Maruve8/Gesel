import { Component, OnInit } from '@angular/core';
import { ProcesoCandidatoService } from '../../services/proceso-candidato.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-proceso-candidato-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './proceso-candidato-list.component.html',
  styleUrl: './proceso-candidato-list.component.css'
})
export class ProcesoCandidatoListComponent implements OnInit{

  relations:any[]=[];

  constructor(private procesoCandidatoService: ProcesoCandidatoService){

  }

  ngOnInit(): void {
    this.getAllRelations();
  }

  getAllRelations():void{
    this.procesoCandidatoService.getAllRelations().subscribe((data)=>{
      this.relations=data;
    });
  }


  deleteRelation(procesoId:number, candidatoId:number):void{
    this.procesoCandidatoService.deleteRelation(procesoId, candidatoId).subscribe(()=>{
      this.getAllRelations(); //lista actualizada
    })
  }

}
