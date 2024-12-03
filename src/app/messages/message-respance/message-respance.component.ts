import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-respance',
  templateUrl: './message-respance.component.html',
  styleUrl: './message-respance.component.css'
})
export class MessageRespanceComponent implements OnInit{
  @Input() message: any;
  msg:String;
  constructor(){
    this.msg="";
  }
ngOnInit(): void {
    this.msg= this.message.messageText||this.msg;
    console.log(this.msg);
}
}
