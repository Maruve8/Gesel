import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoCandidatoService {
  private apiURL = 'http://localhost:8080/api/proceso-candidato'; //springboot

  constructor(private http: HttpClient) { }

  getAllRelations():Observable<any[]>{
    return this.http.get<any[]>(this.apiURL);

  }

  createRelation(relation:any):Observable<any>{
    return this.http.post<any>(this.apiURL, relation);
  }

  deleteRelation(procesoId:number, candidatoId:number): Observable<any>{
    return this.http.delete(`${this.apiURL}/${procesoId}/${candidatoId}`)
  }

  asignarProceso(procesoCandidato: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/asignarProceso`, procesoCandidato);
  }
  


}
