import { Component } from '@angular/core';
import { Break, BreakServiceService } from '../_services/break-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-createbreak',
  templateUrl: './createbreak.component.html',
  styleUrls: ['./createbreak.component.css']
})
export class CreatebreakComponent {
  selectedImage: File | null = null;
  selectedSong: File | null = null;
  description:string;
  audio: HTMLAudioElement | null = null;
  constructor(private breakService: BreakServiceService, private home: HomeComponent) {
    this.description='';
  }


  // Méthode appelée lorsque l'utilisateur sélectionne une image
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }
  onSongSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedSong = input.files[0]; // Stocker le fichier sélectionné
      console.log('Chanson sélectionnée:', this.selectedSong);
      this.playSong(); // Jouer la chanson sélectionnée
    }
  }
  create(): void {
    if (this.selectedSong && this.selectedImage) {
     
      this.breakService.createpost(this.selectedImage, this.selectedSong, this.description);
    } else {
      console.error("Image ou chanson non sélectionnée");
    }
  }

  // Méthode pour jouer la chanson sélectionnée
  playSong(): void {
    if (this.selectedSong) {
      const fileUrl = URL.createObjectURL(this.selectedSong); // Créer une URL temporaire pour jouer la chanson
      this.audio = new Audio(fileUrl); // Créer un nouvel élément audio
      this.audio.play().catch(error => {
        console.error('Erreur lors de la lecture de la chanson:', error);
      });
    }
  }





}
