import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../services/proceso.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor
import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-buttons';
import $ from 'jquery';


declare var bootstrap: any;


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
  procesoIdToDelete: number | null=null; //almaceno id del rpoceso para eliminar
  filteredProcesos: any[] = [];
  uniqueRecruiters: string[] = []; //lista recruiters
  miRecruiter: string = 'Mi recruiter'; //asigna recruiter actual
  filtroEstado: string = '';
  filtroRecruiter: string = '';

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
      });

      setTimeout(() => {
        const table = $('#procesosTable').DataTable();
        if (table) {
          table.destroy();  
        }

        $('#procesosTable').DataTable({
          language: {
            lengthMenu: "Procesos por página _MENU_",
            zeroRecords: "No se encontraron registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ procesos",
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
      }, 100); //retardo para renderizar la tabla bien
    });
  }


  //DE MOMENTO NO SE VAN A UTILIZAR LA FUNCIÓN DE ELIMINAR PROCESO, DEBIDO A LA CANTIDAD DE RELACIONES ENTRE ENTIDADES OPTO POR INACTIVAS O FINALIZAR PROCESO, NO ELIMINAR
  //modal eliminaer proceso y veridfifcar si el proceso tiene recruiter asignado y se está trabajando
  openDeleteModal(id: number, recruiterNombre: string | null): void {
    if (recruiterNombre && recruiterNombre !== 'No asignado') {
      //modal si hay recruiter asignado
      const warningModal = new bootstrap.Modal(document.getElementById('warningModal'));
      warningModal.show();
    } else {
      //eliminar
      this.procesoIdToDelete = id;
      const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
      confirmDeleteModal.show();
    }
  }


  confirmDelete(): void {
    if (this.procesoIdToDelete !== null) {
      this.procesoService.deleteProceso(this.procesoIdToDelete).subscribe(() => {
        this.getProcesos();
        this.procesoIdToDelete = null;
        const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
        confirmDeleteModal.hide();
      });
    }
  }

  deleteProceso(id:number): void {
    this.procesoService.deleteProceso(id).subscribe(()=>{
      this.getProcesos(); //para actualizar la lista
    })
  }
}

