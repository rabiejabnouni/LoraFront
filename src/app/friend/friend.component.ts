import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { FinduserService } from '../_services/finduser.service';
import { SharedUserService } from '../_services/shared-user.service';
import { map } from 'rxjs/operators';
import { ChatService } from '../_services/chat.service';
import { SharedsendToUserService } from '../_services/sharedsend-to-user.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  @Input() conversion: any;
  user: User;
  description: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private sharedUserService: SharedUserService,
    private chatService: ChatService,
    private findUser: FinduserService,
    private sheradSendTo:SharedsendToUserService
  ) {
    this.user = new User();
    this.description = '';
  }

  ngOnInit() {
    this.loadUser(this.conversion.id);


    if (this.conversion) {
      this.description = (this.conversion.description || '<3').substring(0, 10);
    }
  }

  loadUser(conversationId:number) {
    const currentUser = this.tokenStorage.getUser();
    this.chatService.sendTo(conversationId, currentUser).subscribe(
      (response) => {
        this.sharedUserService.setConversationBetwin(response);
        
        // Assurez-vous de vérifier que la réponse contient des données valides
        if (response.length > 0) {
          this.findUser.getUser(response[0]).pipe(
            map(data => {
              this.user.firstname = data.firstName;
              this.user.lastname = data.lastName;
              this.user.pathimage = data.pathImage;
              this.sheradSendTo.setfirstname( data.firstName);
              this.sheradSendTo.setlastname(data.lastName);
              this.sheradSendTo.setpathimage( data.pathImage);
            })
          ).subscribe(
            // Vous pouvez aussi gérer ici les erreurs de la requête
            () => {
              console.log('User loaded successfully:', this.user);
            },
            error => {
              console.error('Error loading user:', error);
            }
          );
        }
      },
      error => {
        console.error('Error sending data:', error);
      }
    );
  }
}

// Classe User pour récupérer les données de l'utilisateur
export class User {
  firstname: string;
  lastname: string;
  pathimage: string;

  constructor() {
    this.firstname = '';
    this.lastname = '';
    this.pathimage = '';
  }
}
