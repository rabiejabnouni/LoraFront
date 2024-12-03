import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { SharedServiceService } from '../_services/shared.break.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  break: number = 0;  // Etat de l'affichage de la div.breakpoint
  post: boolean = true;    // Etat de l'affichage de la div.grid-container
  isBlurred: boolean = false; // Etat du flou sur la grid-container
  selectedBreak: number | null = null;
  constructor(private userService: UserService, private shared_break: SharedServiceService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  // Fonction pour activer ou désactiver le flou et la div.breakpoint
  toggleBreakpoint(breakNumber: number) {
    this.isBlurred = !this.isBlurred;
    this.break = breakNumber;
    this.selectedBreak = this.isBlurred ? breakNumber : null;
  }
  termine() {
    this.isBlurred = !this.isBlurred;
  }
}
