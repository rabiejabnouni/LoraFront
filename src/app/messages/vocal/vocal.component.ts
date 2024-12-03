import { Component,  Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vocal',
  templateUrl: './vocal.component.html',
  styleUrl: './vocal.component.css'
})

export class VocalComponent implements OnInit{
  @Input() message:any;
  msg:string;
  constructor(){
    this.msg= "";
  }
ngOnInit(): void {
  this.msg= this.message.messageText||this.msg;

  }

}
