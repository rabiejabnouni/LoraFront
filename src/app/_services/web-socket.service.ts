import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { TokenStorageService } from './token-storage.service';
import { SharedUserService } from './shared-user.service';
import { ChatService } from './chat.service';
import { environmentws } from '../environment.prod';
const CHAT_URL = environmentws.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: any;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor(private token:TokenStorageService,
             private shared:SharedUserService,
             private chatService:ChatService
  ) {
    this.connect();
  }

  private connect() {
    const socket = new SockJS(CHAT_URL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);

      // S'abonner au sujet public
      this.stompClient.subscribe('/topic/public', (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });

      const username = this.token.getUser();
      const message = {
          username: username
      };

      this.stompClient.send("/app/chat.register", {}, JSON.stringify(message));
    });
  }

sendMessage(messageRequestDTO: any) {
  const sendToList= this.shared.getConversationBetwin();
  console.log(this.shared.getConversationBetwin());
  const messageWebSocketDTO = {
    messageRequestDTO,
    sendToList
  };

  this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(messageWebSocketDTO));
}


  public getMessages(): Observable<string> {
    console.log(this.messageSubject.asObservable());
    return this.messageSubject.asObservable();
  }

}
