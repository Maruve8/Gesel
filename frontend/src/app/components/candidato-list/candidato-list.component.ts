import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '../../services/candidato.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor
import { FormsModule } from '@angular/forms';
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-buttons';
import $ from 'jquery';


declare var bootstrap: any;

@Component({
  selector: 'app-candidato-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './candidato-list.component.html',
  styleUrl: './candidato-list.component.css'
})
export class CandidatoListComponent implements OnInit{

  candidatos: any[] =[];
  candidatoIdToDelete: number | null = null; //almacena el id del candidato que se va a eliminar
  

  constructor(private candidatoService: CandidatoService, private router: Router){}

  ngOnInit(): void {
    console.log("CandidatoListComponent cargado");
    this.getCandidatos();

    
  }

  ngAfterViewInit(): void {
    
    
  }

  getCandidatos(): void{
    this.candidatoService.getCandidatos().subscribe((data)=>{
      console.log("Datos de candidatos:", data);
      this.candidatos =data;

      setTimeout(() => {
        const table = $('#candidatosTable').DataTable();
        if (table) {
          table.destroy();
        }


        $('#candidatosTable').DataTable({
        language: {
          lengthMenu: "Candidatos por página _MENU_",
          zeroRecords: "No se encontraron registros",
          info: "Mostrando _START_ a _END_ de _TOTAL_ candidatos",
          infoEmpty: "No hay entradas disponibles",
          infoFiltered: "(filtrado de _MAX_ entradas en total)",
          search: "Buscar:",
          paginate: {
            first: "<<",
            last: ">>",
            next: "Siguiente",
            previous: "Anterior"
          }
        }
      });
      }, 100); 
    });
  }


  deleteCandidato(id:number): void {
    this.candidatoService.hasInterviews(id).subscribe((hasInterviews: boolean)=>{
      if(hasInterviews){
        //abrir modal si hay entrevista
        const modal=new bootstrap.Modal(document.getElementById('warningModal'));
        modal.show();
      }else{
        
        this.candidatoIdToDelete = id;
        const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
        confirmDeleteModal.show();
      }
    });
  }

  //confirmar la eliminacióin del candidato
  confirmDelete():void{
    if(this.candidatoIdToDelete !==null){
      this.candidatoService.deleteCandidato(this.candidatoIdToDelete).subscribe(()=>{
        this.getCandidatos();//después de eliminar se refresca lista candidatos
        this.candidatoIdToDelete=null;//resetear candidato

        //cuando se confirme, cerrar el modal
        const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')!);
        confirmDeleteModal?.hide();
      })
    }
  }
  
  verCandidato(id: number): void {
    this.router.navigate([`/candidatos/${id}`]);
  }

  

}
