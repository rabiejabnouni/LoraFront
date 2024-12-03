import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../_services/shared.break.service';

@Component({
  selector: 'app-breakpoint',
  templateUrl: './breakpoint.component.html',
  styleUrls: ['./breakpoint.component.css']  // Correction de 'styleUrl' en 'styleUrls'
})
export class BreakpointComponent implements OnInit {
  isPlaying: boolean = false;
  likedSong: boolean = false;
  idBreak: number = 0;
  constructor(private shared_break: SharedServiceService
    
  ) {


   }

  ngOnInit(): void {
    // Récupération de l'identifiant du break depuis le service
    this.idBreak = this.shared_break.get_break_number();
  }
 



  togglePauseTrack() {
    const audioPlayer = document.getElementById("audio") as HTMLAudioElement;
    if (this.isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  toggleLikeSong() {
    this.likedSong = !this.likedSong;
  }
}
