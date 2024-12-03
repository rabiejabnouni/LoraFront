import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BreakServiceService {
  private readonly apiUrl = environment.apiUrl;

  username: string = '';
  post: Break;

  constructor(
    private token: TokenStorageService,
    private http: HttpClient,
  ) {
    this.username = token.getUser();
    this.post = new Break();
  }

  createpost(image: File, song: File, description: string): Observable<any> {
    this.post.sender = this.username;
    this.post.description = description;
    return from(this.getAudioDuration(song))

  }

  getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      const fileURL = URL.createObjectURL(file);
      audio.src = fileURL;

      audio.onloadedmetadata = () => {
        resolve(audio.duration); // La durée en secondes
      };

      audio.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Autres méthodes du service
  played(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.put(`${this.apiUrl}/played`, {}, { params });
  }

  getAllPauseMusicales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getPauseMusicaleById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updatePauseMusicale(id: number, description: string, imagePath: string, songPath: string, length: number): Observable<any> {
    const params = new Break();
    params.sender = this.username;
    params.description = description;
    params.imagePath = imagePath;
    params.songPath = songPath;
    params.length = length;

    return this.http.put(`${this.apiUrl}/update/${id}`, params);
  }

  deletePauseMusicale(id: number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.apiUrl}/delete`, { params });
  }

  getJournalOfBreaks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/journal`);
  }
}

export class Break {
  sender: string;
  description: string;
  imagePath: string;
  songPath: string;
  length: number;

  constructor() {
    this.sender = '';
    this.description = '';
    this.imagePath = '';
    this.songPath = '';
    this.length = 0;
  }
}
