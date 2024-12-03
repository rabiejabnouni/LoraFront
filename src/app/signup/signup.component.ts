import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { SharedUserService } from '../_services/shared-user.service';
import { Router } from '@angular/router';
import { EnableService } from '../_services/enable.service';
declare var google:any;
declare const FB: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  signupObj: signup;  // Object for storing login credentials

  constructor(  private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private shered:SharedUserService,
  private enable:EnableService) {
    this.signupObj = new signup();  // Initializing login object
  }

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      this.initializeGoogleSignIn();
    }).catch((error) => {
      console.error('Error loading Google script', error);
    });
  }
  getProfile() {
    return new Promise((resolve, reject) => {
      FB.api('/me', { fields: 'name, email, picture' }, (response: any) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject('Error fetching profile data');
        }
      });
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

  encoder(token:any){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleCredentialResponse(response: any) {
    const payload = this.encoder(response.credential);
    this.signupObj.email=payload.email;
    this.signupObj.firstName=payload.given_name;
    this.signupObj.lastName=payload.family_name;
    this.signupObj.password=payload.sub;

    this.authService.signup(this.signupObj).subscribe(
      response => {
        this.tokenStorage.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error => {
        alert(error);
        this.router.navigate(['/login']);
      }
    )


}
onsignup() {
  // Disable the form or show a loading spinner here
  this.authService.signup(this.signupObj).subscribe(
    async (response) => {
      alert("Please enable your account via the validation email");

      try {
        const isEnabled = await this.enable.enable(this.signupObj.email);

        if (isEnabled) {
          // Save token and navigate to home page if account is enabled
          this.tokenStorage.saveToken(response.token);
          this.router.navigate(['/home']);
        } else {
          // If account couldn't be enabled, delete the user and reset the signup object
          this.signupObj = new signup();
          alert("Account could not be enabled and has been deleted.");
        }
      } catch (error) {
        console.error('Error enabling the account or deleting user:', error);
        alert('An error occurred while enabling the account or deleting the user.');
        this.signupObj = new signup(); // Reset signup form on error
      }
    },
    (error) => {
      console.error('Signup failed', error);
      this.signupObj = new signup(); // Reset signup form on error
      alert(error);
    }
  );
}

}
// Login class to store login credentials
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


