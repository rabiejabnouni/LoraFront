import { Component } from '@angular/core';
import { SharedServiceService } from '../_services/shared.break.service';
import { HomeComponent } from '../home/home.component';  // Import du composant Home pour accéder à la fonction toggle

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.css']
})
export class BreakComponent {
  constructor(private shared: SharedServiceService, private home: HomeComponent) {}











  
  activateBreak(breakNumber: number) {
    this.shared.set_activate(true);
    this.shared.set_break_number(breakNumber);
    this.home.toggleBreakpoint(breakNumber);  
  }
}
