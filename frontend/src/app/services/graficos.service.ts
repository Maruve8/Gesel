import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GraficosService {
  private apiUrl ='http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  //contrataciones por mes
  getContratacionesPorMes():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/candidatos/contrataciones-por-mes` , { headers });
  }

  //entrevistas por semana
  getEntrevistasPorSemana():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/entrevistas/entrevistas-por-semana` , { headers });
  }

  //total candidatos
  getTotalCandidatos():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/candidatos/total-candidatos` , { headers });

  }

  //procesos activos
  getProcesosActivosPorSemana():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/procesos/procesos-activos` , { headers });
  }


}
