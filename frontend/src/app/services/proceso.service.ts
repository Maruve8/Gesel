import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private apiURL = 'http://localhost:8080/api/procesos'; //url de springboot
  constructor(private http: HttpClient) { }

  //get todos los procesos
  getProcesos(): Observable<any> {
    return this.http.get<any>(this.apiURL, { withCredentials: true });
  }

  //get por id
  getProceso(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  //nuevo proceso
  createProceso(proceso: any): Observable<any>{
    return this.http.post<any>(this.apiURL, proceso, { withCredentials: true }); 
  }

  //actualizar
  updateProceso(id: number, proceso: any): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/${id}`, proceso, { withCredentials: true });
  }

  //eliminar
  deleteProceso(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }
}
