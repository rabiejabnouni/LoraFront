import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { GoogleAuthComponent } from './google-auth-component/google-auth-component.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { TimetableComponent } from './timetable/timetable.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'newPassword',component:NewpasswordComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'google',component:GoogleAuthComponent},
  {path:'timetable',component:TimetableComponent},
  {path:'chat',component:ChatComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
export{Routes};
