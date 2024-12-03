import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { WebsocketService } from './_services/web-socket.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreakComponent } from './break/break.component';
import { BreakpointComponent } from './breakpoint/breakpoint.component';
import { ChatComponent } from './chat/chat.component';
import { CommentComponent } from './comment/comment.component';
import { ConversionComponent } from './conversion/conversion.component';
import { CreatebreakComponent } from './createbreak/createbreak.component';
import { CreateseesionComponent } from './createseesion/createseesion.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FriendComponent } from './friend/friend.component';
import { GoogleAuthComponent } from './google-auth-component/google-auth-component.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageRequestComponent } from './messages/message-request/message-request.component';
import { MessageRespanceComponent } from './messages/message-respance/message-respance.component';
import { NavbarComponent } from './NavBar/navbar.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { PostComponent } from './post/post.component';
import { SessionComponent } from './session/session.component';
import { SignupComponent } from './signup/signup.component';
import { VocalComponent } from './messages/vocal/vocal.component';
import { TimetableComponent } from './timetable/timetable.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    BreakComponent,
    GoogleAuthComponent,
    NewpasswordComponent,
    BreakpointComponent,
    CommentComponent,
    PostComponent,
    CreatebreakComponent,
    TimetableComponent,
    SessionComponent,
    CreateseesionComponent,
    ConversionComponent,
    ChatComponent,
    FriendComponent,
    MessageRequestComponent,
    MessageRespanceComponent,
    VocalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [authInterceptorProviders, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
