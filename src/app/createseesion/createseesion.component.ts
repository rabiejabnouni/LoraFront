import { Component } from '@angular/core';
import { CreatObjService } from '../_services/creat-obj.service';
import { TimetableComponent } from '../timetable/timetable.component';

@Component({
  selector: 'app-createseesion',

  templateUrl: './createseesion.component.html',
  styleUrl: './createseesion.component.css'
})
export class CreateseesionComponent {
sessionObj:session;
constructor(private createService:CreatObjService,
  private timetable:TimetableComponent
){
  this.sessionObj= new session();
}
  create(){
      this.createService.create_session(this.sessionObj).subscribe(
        (Response)=>{
         this.timetable.toggle();
        },
        (error)=>{
          alert(error);
          this.sessionObj=new session();
        }
      );
  }
}
export class session{
  matter:string;
  prof:string;
  date:string;
  salle:number;
  constructor(){
    this.matter='';
    this.prof='';
    this.salle=0;
    this.date='';
  }
}
