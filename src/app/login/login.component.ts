declare var google:any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { SharedUserService } from '../_services/shared-user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj: Login; // Object for storing login credentials
  sigbupObj: signup;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private shered:SharedUserService
  )
   {
    this.loginObj = new Login();
    this.sigbupObj=new signup();
  }

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      this.initializeGoogleSignIn();
    }).catch((error) => {
      console.error('Error loading Google script', error);
    });
  }

  loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById('google-jssdk');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = () => {
          console.log('Google script loaded');
          resolve();
        };
        script.onerror = () => reject(new Error('Google script failed to load'));
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '1043031210641-ld2bn674n49nk4gnrm2q9u50fclbm3b3.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { type: 'icon', size: 'large' }
    );
  }


  onLogin() {
    this.authService.login(this.loginObj).subscribe(
      (response) => {
        this.tokenStorage.saveToken(response.token);
        this.tokenStorage.saveUser(this.loginObj.username);
        this.router.navigate(['/home']); 

      },
      (error) => {
        console.error('Login failed', error);
        this.loginObj=new Login();
      }
    );
  }
  encoder(token:any){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
    const payload = this.encoder(response.credential);
   const email= payload.email;
   console.log(email);
    // Envoie le jeton JWT au backend pour validation
    this.authService.loginWithGoogle(email).subscribe(
        (response) => {
            this.tokenStorage.saveToken(response.token);
            this.tokenStorage.saveUser(email);
            console.log(this.tokenStorage.getUser());
            this.router.navigate(['/home']);
        },
        (error) => {
          this.sigbupObj.email=email;
          this.sigbupObj.firstName=payload.given_name;
          this.sigbupObj.lastName=payload.family_name;
          this.sigbupObj.password=payload.sub;
          this.authService.signupWithGoogle(this.sigbupObj).subscribe(
            (response)=>{
              console.log("compte create ");
              this.router.navigate(['/newPassword']);
            },
            (error)=>{
              console.log("erreur lors de creation");
            }

          )

        }
    );
}


}

// Corrected Login class for credentials
export class Login {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}
export class signup {
  email: string;
  firstName:string;
  lastName:string;
  password: string;

  constructor() {
    this.email = '';
    this.firstName='';
    this.lastName='';
    this.password = '';
  }
}
