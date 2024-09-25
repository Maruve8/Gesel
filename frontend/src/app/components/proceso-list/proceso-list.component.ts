import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../services/proceso.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor

@Component({
  selector: 'app-proceso-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './proceso-list.component.html',
  styleUrl: './proceso-list.component.css'
})
export class ProcesoListComponent implements OnInit{
  procesos: any[] =[];
  hasHibrido: boolean = false; //declaro hasHibrido para mostrar u ocultar la columna de detalle híbrido en función de la modalidad

  constructor(private procesoService: ProcesoService){}

  ngOnInit(): void {
    this.getProcesos();
  }

  getProcesos(): void {
    this.procesoService.getProcesos().subscribe((data)=>{
      this.procesos =data;
      //verificar si hay proceso en modalidad híbrido
      this.hasHibrido = this.procesos.some(proceso=>proceso.modalidad === 'HIBRIDO');

      //asegurar que todos los procesos tengan un cliente asignado
      this.procesos.forEach(proceso=>{
        if(!proceso.cliente){
          proceso.cliente = {nombre: 'Sin cliente'}; //valor predeterminado para evitar errores
        }
      })
    });
  }

  deleteProceso(id:number): void {
    this.procesoService.deleteProceso(id).subscribe(()=>{
      this.getProcesos(); //para actualizar la lista
    })
  }
}
