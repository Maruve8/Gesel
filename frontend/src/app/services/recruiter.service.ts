import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private apiURL = 'http://localhost:8080/api/recruiters'; //url de springboot

  constructor(private http: HttpClient) { }

  //get todos recruiters
  getRecruiters(): Observable<any> {
    return this.http.get<any>(this.apiURL, { withCredentials: true });
  }

  //get por id
  getRecruiter(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }

  //nuevo recruiter
  createRecruiter(recruiter: any): Observable<any>{
    return this.http.post<any>(this.apiURL, recruiter, { withCredentials: true }); //envío (post) a través de http, lo envío a 8080, lo que envío es un recruiter
  }

  //actualizar
  updateRecruiter(id: number, recruiter: any): Observable<any>{
    return this.http.put<any>(`${this.apiURL}/${id}`, recruiter, { withCredentials: true });
  }

  //eliminar
  deleteRecruiter(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`, { withCredentials: true });
  }
}
