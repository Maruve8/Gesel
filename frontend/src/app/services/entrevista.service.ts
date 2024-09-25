import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrevistaService {
  private apiURL = 'http://localhost:8080/api/entrevistas'; //url de springboot
  private apiProcesosURL = 'http://localhost:8080/api/procesos'; 

  constructor(private http: HttpClient) { }

  //get todas las entrevistas
  getEntrevistas(): Observable<any> {
    return this.http.get<any>(this.apiURL, { withCredentials: true });
  }

  //get por id
  getEntrevista(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  //nueva entrevista
  createEntrevista(entrevista: any): Observable<any>{
    return this.http.post<any>(this.apiURL, entrevista, { withCredentials: true }); //envío (post) a través de http, lo envío a 8080, lo que envío es una entrevista
  }

  //actualizar
  updateEntrevista(id: number, entrevista: any): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/${id}`, entrevista, { withCredentials: true });
  }

  //eliminar
  deleteEntrevista(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  //obtener todos los procesos
  getProcesos(): Observable<any> {
    return this.http.get<any>(this.apiProcesosURL, { withCredentials: true });
  }
}
