import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as annyang from 'annyang';

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
  private speechText = new Subject<string>();
  private listeningStatus = new Subject<boolean>();
  constructor() {
    if (!annyang) {
      console.error('Annyang n’est pas pris en charge dans ce navigateur.');
    }
  }


  initialize(commands: { [command: string]: (...args: any[]) => void }): void {
    if (annyang) {
      annyang.addCommands(commands);
      console.log('Commandes initialisées :', commands);
    }
  }

  startListening(language: string = 'fr-FR'): void {
    if (annyang) {
      annyang.setLanguage(language);
      annyang.start({ continuous: true });
      this.listeningStatus.next(true);
      console.log('Reconnaissance vocale démarrée avec la langue :', language);

      annyang.addCallback('result', (phrases: string[]) => {
        console.log('Phrases reconnues :', phrases);
        this.speechText.next(phrases[0]);
      });

      annyang.addCallback('error', (error: any) => {
        console.error('Erreur de reconnaissance vocale :', error);
      });
    }
  }


  stopListening(): void {
    if (annyang) {
      annyang.abort();
      this.listeningStatus.next(false);
      console.log('Reconnaissance vocale arrêtée.');
    }
  }


  getText(): Observable<string> {
    return this.speechText.asObservable();
  }


  isListening(): Observable<boolean> {
    return this.listeningStatus.asObservable();
  }
}
