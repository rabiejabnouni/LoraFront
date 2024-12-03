import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/conversion/conversion.component';
@Component({
  selector: 'app-message-request',
  templateUrl: './message-request.component.html',
  styleUrl: './message-request.component.css'
})
export class MessageRequestComponent implements OnInit{
  @Input() message:any;
  msg:string;
  constructor(){
    this.msg= "";
  }
ngOnInit(): void {
  this.msg= this.message.messageText||this.msg; 
  
  }

}
