import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CandidatoService } from '../../services/candidato.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidato-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './candidato-form.component.html',
  styleUrl: './candidato-form.component.css'
})
export class CandidatoFormComponent implements OnInit{

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
      next: () => this.router.navigate(['/candidatos']),
      //error: (err) => console.error('Error al subir el candidato', err)
    });
  } else {
    // Si no hay archivo, enviar candidato tal cual
    if (this.isEditMode) {
      this.candidatoService.updateCandidato(this.candidatoId!, this.candidato).subscribe(() => {
        this.router.navigate(['/candidatos']);
      });
    } else {
      this.candidatoService.createCandidato(this.candidato).subscribe(() => {
        this.router.navigate(['/candidatos']);
      });
    }
  }
}



}
