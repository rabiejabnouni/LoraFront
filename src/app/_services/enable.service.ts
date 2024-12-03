import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../environment.prod';
@Injectable({
  providedIn: 'root'
})
export class EnableService {
  private readonly apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  enable(email: any, nb: number = 1): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<boolean>(`${this.apiUrl}/enable`, { params: { email } }).subscribe(
        (response) => {
          if (response) {
            // The email was successfully enabled
            console.log('Email enabled successfully:', email);
            resolve(true); // Resolve the promise with true on success
          } else {
            // Retry mechanism if response is not true
            if (nb < 20) {
              console.log(`Retrying to enable email (Attempt ${nb + 1}):`, email);
              const delay = 100* Math.pow(1.2, nb); // Exponential backoff
              setTimeout(() => {
                this.enable(email, nb + 1).then(resolve).catch(reject);
              }, delay);
            } else {
              console.error('Max retry attempts reached for email:', email);
              // Perform deletion if retries fail
              this.deleteUser(email).then(() => {
                alert('Your account has been deleted after maximum retry attempts.');
                resolve(false); // Resolve as false after deletion
              }).catch((error) => {
                console.log('Error deleting the user:', email, error);
                reject(error);
              });
            }
          }
        },
        (error) => {
          console.error('Error enabling email:', error);
          alert('Email not found: ' + error.message);
          reject(error); // Reject the promise on error
        }
      );
    });
  }

  deleteUser(email: any): Promise<void> {
    // Assuming email is passed as a query parameter in the DELETE request
    return this.http.delete<void>(`${this.apiUrl}delete?email=${email}`).toPromise();
  }
}
