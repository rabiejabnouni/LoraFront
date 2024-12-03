import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Route, Router } from '@angular/router';
import { SharedUserService } from '../_services/shared-user.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent implements OnInit {
  passwordObj:password;
  auth:auth;
  constructor(private authservice:AuthService,
              private route: Router,
              private shared:SharedUserService
  ){
    this.passwordObj= new password();
    this.auth= new auth();
  }
  ngOnInit(): void {}
send(){
 if(this.passwordObj.Repeatpassword==this.passwordObj.newpassword){
  this.auth.newpassword=this.passwordObj.Repeatpassword;
  console.log(this.auth.username);
   this.authservice.setPasssword(auth).subscribe(
    (res)=>{
      console.log("password update with successful");
      this.route.navigate(['/home']);

    },
    (error)=>{
      console.log("password in valide");
      this.passwordObj= new password();
    }
  )
}else{
  alert("inaccaptet password");
  this.passwordObj= new password();
}
}
}
export class password{
  newpassword:string;
  Repeatpassword:string;
  constructor(){
    this.Repeatpassword='';
    this.newpassword='';
  }
}
export class auth{
  newpassword:string;
  username:string;
  constructor(){
    this.username='';
    this.newpassword='';
  }
}
