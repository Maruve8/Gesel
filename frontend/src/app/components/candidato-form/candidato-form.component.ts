import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CandidatoService } from '../../services/candidato.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcesoCandidatoService } from '../../services/proceso-candidato.service';
import { ProcesoService } from '../../services/proceso.service';

@Component({
  selector: 'app-candidato-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './candidato-form.component.html',
  styleUrl: './candidato-form.component.css'
})
export class CandidatoFormComponent implements OnInit{

  procesos: any[] = []; //almacenar procesos
  procesoSeleccionado: any = null; //proceso que vamos a asignar

  candidato: any = {
    nombre: '',
    apellidos: '',
    descripcion: '',
    estado: '',
    cvUrl: ''
  };

  isEditMode = false;
  candidatoId: number | null = null;
  selectedFile: File | null = null; // almacenar el cv seleccionado
  estados: string[] = ['PROCESO', 'RECHAZADO', 'ENTREVISTADO', 'CONTRATADO', 'INACTIVO',]; // estados de los candidatos definidos


  constructor(
    private candidatoService: CandidatoService, //obtener candidatos
    private procesoService: ProcesoService,
    private procesoCandidatoService: ProcesoCandidatoService,
    private route: ActivatedRoute,
    private router: Router
  ){}

ngOnInit(): void {
  this.route.params.subscribe(params=>{
    this.candidatoId=params['id'];
    if(this.candidatoId){
      this.isEditMode=true;
      this.candidatoService.getCandidato(this.candidatoId).subscribe(data=>{
        this.candidato=data;
      });
    }
  });
  // Obtener la lista de procesos
  this.procesoService.getProcesos().subscribe(data => {
    this.procesos = data; 
  });
}


onFileSelected(event:any): void{
  const file = event.target.files[0];
  if(file){
    this.selectedFile=file; //almacenar el cv en una variable
  }
}

saveCandidato(): void {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('candidato', JSON.stringify(this.candidato));

    this.candidatoService.uploadCandidato(formData).subscribe({
      next: (nuevoCandidato) => {
        this.candidatoId = nuevoCandidato.id; //actualizar el id del candidato nuevo
        this.asignarProceso(); //llama asignar porceso
      },
      error: (err) => {
        console.error('Error al subir el candidato', err);
      }
    });
  } else {
    if (this.isEditMode) {
      this.candidatoService.updateCandidato(this.candidatoId!, this.candidato).subscribe({
        next: () => {
          this.asignarProceso(); //después de actualizar, asignar proceso
        },
        error: (err) => {
          console.error('Error al actualizar candidato', err);
        }
      });
    } else {
      this.candidatoService.createCandidato(this.candidato).subscribe({
        next: (nuevoCandidato) => {
          this.candidatoId = nuevoCandidato.id;
          this.asignarProceso(); 
        },
        error: (err) => {
          console.error('Error al crear candidato', err);
        }
      });
    }
  }
}

asignarProceso(): void {
  //si se selecciona un proceso, asociarlo al candidato
  if (this.procesoSeleccionado) {
    const procesoCandidato = {
      candidatoId: this.candidatoId, //utilizxar el id del candidato
      procesoId: this.procesoSeleccionado ? this.procesoSeleccionado.id : null //sólo si se ha seleccionado un poroceso
    };

    this.procesoCandidatoService.asignarProceso(procesoCandidato).subscribe({
      next: () => this.router.navigate(['/candidatos']), //succes
      error: (err) => {
        console.error('Error al asignar proceso', err);
        //this.router.navigate(['/candidatos']); //redirigir incluso en caso de error
        console.log(err.message);
        console.log(err.status);
      }
    });
  } else {
    this.router.navigate(['/candidatos']); //si no hay proceso, simplemente redirigir
  }
}





}
