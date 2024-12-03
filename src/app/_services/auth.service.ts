import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, interval } from 'rxjs';
import { environment } from '../environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) {}

  // Fonction de login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users/login`, credentials, httpOptions);
  }

  // Fonction d'inscription
  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}signup`, user, httpOptions);
  }
  signupWithGoogle(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}signupWithGoogle`, user, httpOptions);
  }
  // Fonction pour vérifier si l'utilisateur a activé son compte via email
forget(username:string):Observable<any>{
  return this.http.post(`${this.apiUrl}forget`, username,httpOptions);
}
enable(username:any){
  this.http.post(`${this.apiUrl}enable`, username, httpOptions);

}
loginWithGoogle(email: string) {
  return this.http.post<any>(`${this.apiUrl}users/google`,email,httpOptions);
}
 setPasssword(password:any){
  return this.http.post<any>(`${this.apiUrl}forget/updatePassword`,password,httpOptions);
 }
}
