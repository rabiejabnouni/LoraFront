import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';
import { SharedUserService } from '../_services/shared-user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  conversions: any[] = [];

  constructor(
    private chatService: ChatService,
    private shared: SharedUserService,
  ) {}

  ngOnInit(): void {
    this.loadConversion();
  }

  loadConversion() {
    this.chatService.getConversionByUsername().subscribe(
      (res)=>{
        this.conversions=res;

      },
      (error)=>{
        console.log(error);
      }

    )
  }

  onConversationClick(conversationId: number) {
    this.shared.setConversationId(conversationId); 
  }
}
