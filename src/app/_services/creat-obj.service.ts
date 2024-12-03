import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatObjService {
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http:HttpClient) { }
  create_session(session: any): Observable<any> {
    return this.http.post(`${this.apiUrl}session/create`, session);
  }
}
