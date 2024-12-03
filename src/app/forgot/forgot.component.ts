import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { SharedUserService } from '../_services/shared-user.service';
import { EnableService } from '../_services/enable.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
// Remove this line

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  username:string= '';
  constructor(private authservice:AuthService,
    private enable:EnableService,
    private shared:SharedUserService,
    private tokenStorage:TokenStorageService,
    private router:Router,



  ){ }
  forget(){
    console.log(this.username);
    this.authservice.forget(this.username).subscribe(
      async (response) => {
        alert("Please enable your account via the validation email");

        try {
          const isEnabled = await this.enable.enable(this.username);

          if (isEnabled) {
            // Save token and navigate to home page if account is enabled
            this.tokenStorage.saveToken(response.token);
            this.router.navigate(['/newPassword']);
          } else {
            // If account couldn't be enabled, delete the user and reset the signup object
           this.router.navigate(['/signup']);
          }
        } catch (error) {
          console.error('Error enabling the account or deleting user:', error);
          alert('An error occurred while enabling the account or deleting the user.');
          this.username=''; // Reset signup form on error
        }
      }

    )
  }

}
