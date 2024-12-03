import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment.prod';
@Injectable({
  providedIn: 'root'
})
export class FinduserService {
  private readonly apiUrl = environment.apiUrl; // L'URL de votre backend

  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<any> {
    // Passer le paramètre 'username' via HttpParams
    const params = new HttpParams().set('username', username);
    return this.http.get<any>(`${this.apiUrl}/conversations/findUser`, { params });
  }
}
