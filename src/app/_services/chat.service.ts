import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedConversionService } from './shared-conversion.service';
import { SharedUserService } from './shared-user.service';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
messageSend:Message;
  private readonly apiUrl = environment.apiUrl;


  constructor(private http: HttpClient,
              private shared:SharedConversionService,
              private tokenStorage: TokenStorageService
  )
  {
    this.messageSend= new Message();
   }


   getMessages(conversionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/messages/conversation`, {
      params: { conversionId }
    });
  }
  getFirstConversationId(): Observable<number> {
    const user = this.tokenStorage.getUser();
    return this.http.get<number>(`${this.apiUrl}/conversations/getFirst`, {
      params: { username: user } // Assurez-vous que "username" est la clé attendue par votre backend
    });
  }

  sendTo(id: number, user: string): Observable<string[]> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('user', user);

    return this.http.get<string[]>(`${this.apiUrl}/conversations/sendTo`, { params });
  }
  sendMessage(message: string, conversationId: number,sender:string) {
    const messageSend = {
      message: message,
      conversionId: conversationId,
      sender: sender
    };
    console.log(messageSend);

    return this.http.post(`${this.apiUrl}/messages`, messageSend);

  }

  seen(){

    return this.http.put(`${this.apiUrl}/seen`,this.shared.getMessageId());
  }
  getByConversionId(): Observable<any> {
    const conversionId = this.shared.getConversionId(); // Assuming this returns a number
    return this.http.get<any>(`${this.apiUrl}/conversation`, {
      params: { conversionId: conversionId.toString() } // Convert to string
    });
  }
  getConversionByUsername(): Observable<any> {
    const creator=this.tokenStorage.getUser(); // Assuming this returns a number
    return this.http.get<any>(`${this.apiUrl}/conversations/getByCreator`, {
      params: {  creator } // Convert to string
    });
  }
  delete(){
    const conversionId=this.shared.getConversionId();
    return this.http.delete(`|${this.apiUrl}`,{params:{conversionId:conversionId.toString()}});
  }

}
export class Message{
  message:string;
  conversionId:Number;
  sender:string;
  constructor(){
    this.conversionId=0;
    this.message="";
    this.sender=""
  }
}

