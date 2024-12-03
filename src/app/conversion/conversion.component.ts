import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { SharedUserService } from '../_services/shared-user.service';
import { WebsocketService } from '../_services/web-socket.service';
import { map, Subscription, switchMap } from 'rxjs';
import { ChatService } from '../_services/chat.service';
import { FinduserService } from '../_services/finduser.service';
import { SharedsendToUserService } from '../_services/sharedsend-to-user.service';
import { SpeechRecognitionService } from '../_services/AnnyangService';

export class Message {
  sender: string;
  conversionId: number;
  messageText: string;
  type: string;

  constructor() {
    this.conversionId = 0;
    this.sender = '';
    this.type = '';
    this.messageText = '';
  }
}

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

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  messages: Message[] = [];
  currentUser: string = '';
  message: Message = new Message();
  sendTo: User = new User();
  isListening: boolean = false;
  private speechTextSubscription!: Subscription;
  private messageSubscription!: Subscription;
  private autoScroll: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private sharedUserService: SharedUserService,
    private webSocketService: WebsocketService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef,
    private sharedSendTo: SharedsendToUserService,
    private findUser: FinduserService,
    private speechRecognitionService: SpeechRecognitionService
  ) {}

  ngOnInit(): void {
    this.message.conversionId = this.sharedUserService.getConversationId();
    this.message.sender = this.tokenStorage.getUser();
    this.currentUser = this.tokenStorage.getUser();

    const conversationId = this.sharedUserService.getConversationId();
    if (conversationId > 0) {
      this.loadUser(conversationId);
      this.loadMessages(conversationId);
    } else {
      console.error('Invalid conversation ID');
    }

    this.webSocketService.getMessages().subscribe(
      (message: string) => {
        if (message) {
          const newMessage = new Message();
          newMessage.sender = this.currentUser;
          newMessage.conversionId = this.message.conversionId;
          newMessage.messageText = message;
          newMessage.type = 'CHAT';

          this.messages.push(newMessage);
          this.autoScroll = true;
          this.cdr.detectChanges();
        } else {
          console.error('Received an empty message');
        }
      },
      error => {
        console.error('Error receiving messages:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    if (this.autoScroll) {
      this.scrollToBottom();
      this.autoScroll = false;
    }
  }

  ngOnDestroy(): void {
    if (this.speechTextSubscription) this.speechTextSubscription.unsubscribe();
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }

  loadMessages(id: number): void {
    this.chatService.getMessages(id).subscribe(
      (data: any[]) => {
        this.messages = data.map(item => {
          const msg = new Message();
          msg.sender = item.senderId;
          msg.conversionId = item.conversionId;
          msg.type = item.type;
          msg.messageText = item.message;
          return msg;
        });
        this.autoScroll = true;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  send(): void {
    if (this.message.messageText.trim()) {
      this.message.type = 'CHAT';
      this.webSocketService.sendMessage(this.message);
      this.messages.push({ ...this.message });
      this.message.messageText = '';
      this.autoScroll = true;
    }
  }




  sendVocal(): void {
    this.isListening!=this.isListening;
    if (this.isListening) {
      this.speechRecognitionService.stopListening();
      this.isListening = false;
    } else {
      this.speechRecognitionService.startListening();
      this.isListening = true;

      this.speechTextSubscription = this.speechRecognitionService
        .getText()
        .subscribe((text: string) => {
          this.message.messageText = text;
        });
    }
  }

  loadUser(conversationId: number): void {
    const currentUser = this.tokenStorage.getUser();
    this.chatService.sendTo(conversationId, currentUser).pipe(
      switchMap(response => {
        this.sharedUserService.setConversationBetwin(response);
        if (response.length > 0) {
          return this.findUser.getUser(response[0]).pipe(
            map(data => {
              this.sendTo.firstname = data.firstName;
              this.sendTo.lastname = data.lastName;
              this.sendTo.pathimage = data.pathImage;
              this.sharedSendTo.setfirstname(data.firstName);
              this.sharedSendTo.setlastname(data.lastName);
              this.sharedSendTo.setpathimage(data.pathImage);
            })
          );
        } else {
          throw new Error('No user found for this conversation.');
        }
      })
    ).subscribe(
      () => console.log('User loaded successfully:', this.sendTo),
      error => console.error('Error loading user:', error)
    );
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }
}
