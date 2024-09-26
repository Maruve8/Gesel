import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EntrevistaService } from '../../services/entrevista.service';
import { CandidatoService } from '../../services/candidato.service'; //importo servicio de candidatos para poder cargarlos en el ngoinit
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

 

@Component({
  selector: 'app-entrevista-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './entrevista-form.component.html',
  styleUrl: './entrevista-form.component.css'
})
export class EntrevistaFormComponent implements OnInit{

  entrevista: any={
    candidato: null,
    proceso: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    feedback: '',
    tipo: ''
  }


  candidatos: any[]=[]; //almacenar la lista de candidatos
  procesos: any[] = []; //añadir array para procesos
  tipos: string[] = ['CLIENTE', 'PROYECTO', 'RECRUITER']; //TIPOS DE ENTREVISTA DISPONIBLES
  isEditMode=false;
  entrevistaId: number | null = null;


  constructor(
    private entrevistaService: EntrevistaService,
    private candidatoService: CandidatoService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    //cargar lista de candidatos
    this.candidatoService.getCandidatos().subscribe(
      (data) => {
        this.candidatos = data;
      },
      (error) => {
        console.error('Error al cargar los candidatos:', error);
      }
    );
  
    //cargar lista de procesos
    this.loadProcesos();
  
    //obtener entrevista si es edición
    this.route.params.subscribe(params => {
      this.entrevistaId = params['id'];
      if (this.entrevistaId) {
        this.isEditMode = true;
        this.entrevistaService.getEntrevista(this.entrevistaId).subscribe(
          (data) => {
            this.entrevista = data;
          },
          (error) => {
            console.error('Error al cargar la entrevista:', error);
          }
        );
      }
    });
  }
  
  //método para cargar la lista de procesos
  loadProcesos(): void {
    this.entrevistaService.getProcesos().subscribe(
      (data) => {
        this.procesos = data;
      },
      (error) => {
        console.error('Error al cargar los procesos:', error);
      }
    );
  }
  



  saveEntrevista(): void {
    if (this.isEditMode) {
      this.entrevistaService.updateEntrevista(this.entrevistaId!, this.entrevista).subscribe(() => {
        this.router.navigate(['/entrevistas']);
      });
    } else {
      this.entrevistaService.createEntrevista(this.entrevista).subscribe(() => {
        this.router.navigate(['/entrevistas']);
      });
    }
  }

}


