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

  //obtener candidato con el proceso asignado
  getCandidatoConProceso(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/con-proceso/${id}`, { withCredentials: true });
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

  //verififcación entrevista para eliminar candidato
  hasInterviews(id:number): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiURL}/${id}/has-interviews`);
  }

  //candidatos por estado para pipeline
  getCandidatosPorEstado(procesoId:number):Observable<any>{
    return this.http.get<any>(`${this.apiURL}/proceso/${procesoId}/candidatos-por-estado`, { withCredentials: true });
  }

  //actualizar estado del candidato
  updateCandidatoEstado(candidatoId:number, estado:string):Observable<any>{
    //depurando errores
    console.log(`Enviando solicitud al springboot para actualizar estado del candidato ${candidatoId} a ${estado}`);
    return this.http.put(`${this.apiURL}/${candidatoId}/estado`, { estado }, { withCredentials: true });
  }

  getProceso(procesoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/procesos/${procesoId}`, { withCredentials: true });
  }
  
}
