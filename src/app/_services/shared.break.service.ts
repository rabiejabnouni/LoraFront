import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  activate: boolean = false;
  break_number: any;
  grid_blurred: boolean = false;
  show_breakpoint: boolean = false;

  constructor() {
    this.break_number = 0;
  }

  get_activate() {
    return this.activate;
  }

  set_activate(activate: boolean) {
    this.activate = activate;
  }

  get_break_number() {
    return this.break_number;
  }

  set_break_number(break_number: any) {
    this.break_number = break_number;
  }

  blurGrid(blur: boolean) {
    this.grid_blurred = blur;
  }

  showBreakOverlay(show: boolean) {
    this.show_breakpoint = show;
  }
}
