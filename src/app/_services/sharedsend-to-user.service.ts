import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedsendToUserService {

 
    private _firstname: string;
    private _lastname: string;
    private _pathimage: string;
  
    constructor() {
      this._firstname = '';
      this._lastname = '';
      this._pathimage = '';
    }
  
    // Getter et Setter pour firstname
    getfirstname(): string {
      return this._firstname;
    }
  
    setfirstname(value: string) {
      this._firstname = value;
    }
  
    // Getter et Setter pour lastname
    getlastname(): string {
      return this._lastname;
    }
  
    setlastname(value: string) {
      this._lastname = value;
    }
  
    // Getter et Setter pour pathimage
    getpathimage(): string {
      return this._pathimage;
    }
  
    setpathimage(value: string) {
      this._pathimage = value;
    }
  }
  

