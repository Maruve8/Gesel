import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../../services/recruiter.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // importar CommonModule para usar ngFor
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

import 'datatables.net';
import 'datatables.net-bs5';
import 'datatables.net-buttons';
import $ from 'jquery';

declare var bootstrap: any;

@Component({
  selector: 'app-recruiter-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './recruiter-list.component.html',
  styleUrl: './recruiter-list.component.css'
})
export class RecruiterListComponent implements OnInit{
  recruiters: any[] =[];
  recruiterIdToDelete: number | null = null;//almacena el recruiter a eliminar

  constructor(private recruiterService: RecruiterService, private authService: AuthService){}

  ngOnInit(): void {
    this.getRecruiters();
  }

  getRecruiters(): void {
    this.recruiterService.getRecruiters().subscribe((data)=>{
      console.log('Recruiters received:', data);  // Log para verificar los datos
      this.recruiters =data;
      setTimeout(() => {
        const table = $('#recruitersTable').DataTable();
        if (table) {
          table.destroy();
        }
        $('#recruitersTable').DataTable({
          language: {
            lengthMenu: "Recruiters por página _MENU_",
            zeroRecords: "No se encontraron registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ recruiters",
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

  openDeleteModal(id: number): void {
    this.recruiterIdToDelete = id;
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
    confirmDeleteModal.show();
  }

  confirmDelete(): void {
    if (this.recruiterIdToDelete !== null) {
      this.recruiterService.deleteRecruiter(this.recruiterIdToDelete).subscribe(() => {
        this.getRecruiters(); //refrescar
        this.recruiterIdToDelete = null;

        //cerrar el modal
        const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')!);
        confirmDeleteModal?.hide();
      });
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin(); //verififcar si es admin
  }
}
