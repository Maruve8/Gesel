import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiURL = 'http://localhost:8080/api/clientes'; //url de springboot
  constructor(private http: HttpClient) { }

  //get todos los clientes
  getClientes(): Observable<any> {
    return this.http.get<any>(this.apiURL, { withCredentials: true });
  }

  //get por id
  getCliente(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  //nuevo cliente
  createCliente(cliente: any): Observable<any>{
    return this.http.post<any>(this.apiURL, cliente, { withCredentials: true }); //envío (post) a través de http, lo envío a 8080, lo que envío es un recruiter
  }

  //actualizar
  updateCliente(id: number, cliente: any): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/${id}`, cliente, { withCredentials: true });
  }

  //eliminar
  deleteCliente(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }
}
