import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private apiURL = 'http://localhost:8080/api/candidatos'; //url de springboot
  constructor(private http: HttpClient) { }

  //get todos los candidatos
  getCandidatos(): Observable<any> {
    return this.http.get<any>(this.apiURL, { withCredentials: true });
  }

  //get por id
  getCandidato(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  //nuevo candidato
  createCandidato(candidato: any): Observable<any>{
    return this.http.post<any>(this.apiURL, candidato, { withCredentials: true }); 
  }

  //actualizar
  updateCandidato(id: number, candidato: any): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/${id}`, candidato, { withCredentials: true });
  }

  //eliminar
  deleteCandidato(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }


  // método para manejar la carga del cv con los datos del candidato
  uploadCandidato(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/candidatos/upload', formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }
}
