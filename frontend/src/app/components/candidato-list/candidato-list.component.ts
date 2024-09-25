import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidato-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './candidato-list.component.html',
  styleUrl: './candidato-list.component.css'
})
export class CandidatoListComponent implements OnInit{

  candidatos: any[] =[];

  constructor(private candidatoService: CandidatoService){}

  ngOnInit(): void {
    console.log("CandidatoListComponent cargado");
    this.getCandidatos();
  }

  getCandidatos(): void{
    this.candidatoService.getCandidatos().subscribe((data)=>{
      this.candidatos =data;
    });
  }


  deleteCandidato(id:number): void {
    this.candidatoService.deleteCandidato(id).subscribe(()=>{
      this.getCandidatos(); //para actualizar la lista
    })
  }

}
