import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  recruiter:any={}; //se guardan aquí los datos del recruiter

  constructor(private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (!username || username === 'user' || username === 'admin') {
      this.router.navigate(['/home']);  //redirige al home para usuarios en memoria
    } else {
      //carga la info del recruiter desde la bbdd
      firstValueFrom(this.http.get(`/api/recruiters/username/${username}`))
        .then((response: any) => {
          this.recruiter = response;
        })
        .catch((error) => {
          console.error('Error al cargar el perfil', error);
        });
    }
  }
  
  
  //cargar la información del perfil
cargarPerfil(): void {
  const username = localStorage.getItem('username');

  this.http.get(`/api/recruiters/username/${username}`).subscribe({
    next: (data: any) => {
      this.recruiter = data;

      // Recuperar la URL de la foto desde el localStorage
      const savedFotoUrl = localStorage.getItem(`${this.recruiter.id}-fotoUrl`);
      if (savedFotoUrl) {
        this.recruiter.fotoUrl = savedFotoUrl;  // Si hay foto guardada, la asignamos
      }
    },
    error: (error) => {
      console.error('Error al cargar el perfil', error);
    }
  });
}


//cargar foto
async onFileSelected(event: any): Promise<void> {
  const file: File = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response: any = await firstValueFrom(
        this.http.post(`/api/recruiters/upload-photo/${this.recruiter.id}`, formData)
      );
      
      
      if (response && response.fotoUrl) {
        this.recruiter.fotoUrl = response.fotoUrl;  //actualiza la URL de la foto
      } else {
        console.error('No se encontró la URL de la foto en la respuesta', response);
      }
    } catch (error) {
      console.error('Error al subir la foto', error);
    }
  }
}

  
  
  

}
