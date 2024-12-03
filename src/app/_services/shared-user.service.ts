import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  private conversationIdSource = new BehaviorSubject<number>(4);
  conversationId$ = this.conversationIdSource.asObservable(); 
  private users: string[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.getFirstConversationId().subscribe(
      (response) => {
        this.conversationIdSource.next(response); // Assurez-vous que `setConversationId` attend un `number`
      },
      (error) => {
        console.error('Error fetching first conversation ID:', error); // Ajoutez un gestionnaire d'erreurs
      }
    );
  }
  


  setConversationId(id: number) {
    this.conversationIdSource.next(id); // Émet un nouvel ID
    console.log(id);
  }

  getConversationId(): number {
    return this.conversationIdSource.getValue(); // Renvoie la valeur actuelle
  }

  setConversationBetwin(users: string[]) {
    this.users = users;
     // Stocke la liste des utilisateurs
  }

  getConversationBetwin(): string[] {
    return this.users; // Renvoie la liste des utilisateurs
  }

}
