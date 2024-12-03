import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

declare const google: any; // Déclare l'objet google globalement pour TypeScript

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth-component.component.html',
  styleUrls: ['./google-auth-component.component.css']
})
export class GoogleAuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

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
        script.id = 'google-jssdk';
        script.async = true;
        script.defer = true;
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
      client_id: 'YOUR_GOOGLE_CLIENT_ID', // Remplace par ton propre client ID
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any) {

}
}
