import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../_services/shared.break.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  content?: string;
  break: number = 0;  // Tracks the current selected break
  isBlurred: boolean = false; // Controls if the grid should be blurred
  selectedBreak: number | null = null;

  // List of breakpoints, using indices from 1 to 35
  breakpoints = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25];

  // List of days and events
  days = [
    { date: '2022-02-01', day: 1, name: 'Dark Chocolate Day' },
    { date: '2022-02-02', day: 2, name: 'Groundhog Day' },
    { date: '2022-02-03', day: 3, name: 'Carrot Cake Day' },
    { date: '2022-02-04', day: 4, name: 'Wear Red Day' },
    { date: '2022-02-05', day: 5, name: 'Weatherperson\'s Day' },
    { date: '2022-02-06', day: 6, name: 'Chopsticks Day' },
    { date: '2022-02-07', day: 7, name: 'Periodic Table Day' },
    { date: '2022-02-08', day: 8, name: 'Kite Flying Day' },
    { date: '2022-02-09', day: 9, name: 'Pizza Day' },
    { date: '2022-02-10', day: 10, name: 'Umbrella Day' },
    { date: '2022-02-11', day: 11, name: 'Inventor\'s Day' },
    { date: '2022-02-12', day: 12, name: 'Global Movie Day' },
    { date: '2022-02-13', day: 13, name: 'Tortellini Day' },
    { date: '2022-02-14', day: 14, name: 'Valentine\'s Day' },
    { date: '2022-02-15', day: 15, name: 'Gumdrop Day' },
    { date: '2022-02-16', day: 16, name: 'Do a Grouch a Favor Day' },
    { date: '2022-02-17', day: 17, name: 'Cabbage Day' },
    { date: '2022-02-18', day: 18, name: 'Battery Day' },
    { date: '2022-02-19', day: 19, name: 'Chocolate Mint Day' },
    { date: '2022-02-20', day: 20, name: 'Love Your Pet Day' },
    { date: '2022-02-21', day: 21, name: 'President\'s Day' },
    { date: '2022-02-22', day: 22, name: 'Cook a Sweet Potato Day' },
    { date: '2022-02-23', day: 23, name: 'Tile Day' },
    { date: '2022-02-24', day: 24, name: 'Toast Day' },
    { date: '2022-02-25', day: 25, name: 'Clam Chowder Day' },
  ];

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

  // Function to toggle the selected breakpoint and blur effect
  toggleBreakpoint(breakNumber: number): void {
    this.isBlurred = !this.isBlurred;
    this.break = breakNumber;
    this.selectedBreak = this.isBlurred ? breakNumber : null;
  }
  toggle(): void {
    this.isBlurred = !this.isBlurred;
  }
}
