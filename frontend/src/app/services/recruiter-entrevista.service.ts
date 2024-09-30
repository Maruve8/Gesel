import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterEntrevistaService {
  private apiURL = 'http://localhost:8080/api/recruiter-entrevista'; //url springboot

  constructor(private http: HttpClient) { }

  getAllRelations(): Observable<any>{
    return this.http.get<any>(this.apiURL);
  }


  createRelation(relation: any):Observable<any>{
    return this.http.post<any>(this.apiURL, relation);
  }


  deleteRelation(recruiterId:number, entrevistaId:number):Observable<any>{
    return this.http.delete(`${this.apiURL}/${recruiterId}/${entrevistaId}`);
  }
}
