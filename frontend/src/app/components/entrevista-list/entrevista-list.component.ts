import { Component, OnInit } from '@angular/core';
import { EntrevistaService } from '../../services/entrevista.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor


@Component({
  selector: 'app-entrevista-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './entrevista-list.component.html',
  styleUrl: './entrevista-list.component.css'
})
export class EntrevistaListComponent implements OnInit{

  entrevistas: any[] = [];

  constructor(private entrevistaService: EntrevistaService){}

  ngOnInit(): void {
    this.getEntrevistas();
  }

  getEntrevistas(): void{
    this.entrevistaService.getEntrevistas().subscribe((data)=>{
      this.entrevistas=data;
    })
  }

  deleteEntrevista(id: number): void{
    this.entrevistaService.deleteEntrevista(id).subscribe(()=>{
      this.getEntrevistas(); //actualizar depués la lista de entrevistas
    })
  }
}
