import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.css'
})
export class PipelineComponent implements OnInit{
  procesoId:number=0;
  estados: string[]= ['PROCESO', 'ENTREVISTADO', 'RECHAZADO', 'CONTRATADO'];
  candidatosPorEstado: {[key: string]: any[]}={};
 

  constructor(private candidatoService: CandidatoService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    console.log('candidatosPorEstado inicial:', this.candidatosPorEstado);
    this.procesoId=+this.route.snapshot.paramMap.get('id')!;

    this.candidatoService.getCandidatosPorEstado(this.procesoId).subscribe((candidatosPorEstado: any)=>{
      //inicializo los arrays de los estados, que aparecen vacíos en los logs
      this.candidatosPorEstado = {
        'PROCESO': candidatosPorEstado['PROCESO'] || [],
        'ENTREVISTADO': candidatosPorEstado['ENTREVISTADO'] || [],
        'RECHAZADO': candidatosPorEstado['RECHAZADO'] || [],
        'CONTRATADO': candidatosPorEstado['CONTRATADO'] || []
    };

      

      console.log('candidatosPorEstado actualizado: ', this.candidatosPorEstado);
    });

    
  }

  cargarCandidatos():void{
    this.candidatoService.getCandidatosPorEstado(this.procesoId).subscribe(data=>{
      this.candidatosPorEstado=data;
    });
  }

  onDrop(event: CdkDragDrop<any[]>, estadoDestino:string): void{
    console.log('Evento onDrop disparado', event, estadoDestino);

    //previo y actual
    console.log('Datos del contenedor anterior:', event.previousContainer.data);
    console.log('Datos del contenedor actual:', event.container.data);

    if(event.previousContainer===event.container){
      console.log('Movimiento dentro de la misma columna');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else{
      //depurando errores
        console.log('Movimiento entre columnas');
        console.log('Datos previos:', event.previousContainer.data);
        console.log('Datos actuales:', event.container.data);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const candidato = event.container.data[event.currentIndex];
        console.log('Candidato movido:', candidato);
        console.log(`Candidato ID: ${candidato.id}, Estado Destino: ${estadoDestino}`);
        this.actualizarEstadoCandidato(candidato.id, estadoDestino);
    }
}


  actualizarEstadoCandidato(candidatoId:number, nuevoEstado:string):void{
    console.log(`Cambiando estado del candidato ${candidatoId} a ${nuevoEstado}`);
    this.candidatoService.updateCandidatoEstado(candidatoId, nuevoEstado).subscribe({
      next: () => {
        console.log(`Candidato ${candidatoId} actualizado a ${nuevoEstado}`);
      },
      error: (error) => {
        console.error('Error al actualizar el estado del candidato:', error);
      }
    });
  }

}
