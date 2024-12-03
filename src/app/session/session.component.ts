import { Component } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {
classroomObj:Classroom;
constructor(){
  this.classroomObj=new Classroom();
}


}
export class Classroom {
  matter: string;           // Subject or course matter
  teacher: string;          // Teacher's name
  classroomCode: string;     // Unique classroom code
  chapters: string[];        // List of chapters covered
  photoShare: string[];      // List of photo URLs shared
  shareFile: string[];       // List of file URLs shared
  homeWork:HomeWork[];
  constructor() {
    this.matter ='';
    this.teacher = '';
    this.classroomCode ='';
    this.chapters = [];
    this.photoShare = [];
    this.shareFile =[];
    this.homeWork=[];
  }

  // Method to add a new chapter
  addChapter(newChapter: string): void {
    this.chapters.push(newChapter);
  }

  // Method to share a new photo
  sharePhoto(photoUrl: string): void {
    this.photoShare.push(photoUrl);
  }

  // Method to share a new file
  shareFileUrl(fileUrl: string): void {
    this.shareFile.push(fileUrl);
  }

  // Method to display classroom info
  displayClassroomInfo(): void {
    console.log(`Classroom: ${this.matter}`);
    console.log(`Teacher: ${this.teacher}`);
    console.log(`Classroom Code: ${this.classroomCode}`);
    console.log(`Chapters: ${this.chapters.join(', ')}`);
    console.log(`Photos Shared: ${this.photoShare.join(', ')}`);
    console.log(`Files Shared: ${this.shareFile.join(', ')}`);
  }


}
export class HomeWork {
  discription:string;
  deadline:string;
  shareFile: string[];
  constructor() {
 this.discription='';
 this.deadline="";
 this.shareFile=[];
  }
}
