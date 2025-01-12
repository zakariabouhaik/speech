import { Component, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-speech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent {
  text = '';
  isListening = false;
  recognition: any;
  currentLanguage = 'ar';
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = this.currentLanguage;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onstart = () => {
          console.log('Recognition started');
          this.cdr.detectChanges();
        };

        this.recognition.onend = () => {
          console.log('Recognition ended');
          this.cdr.detectChanges();
        };

        this.recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
          console.log('Transcript:', transcript);
          this.text = transcript;
          this.cdr.detectChanges();
        };

        this.recognition.onerror = (event: any) => {
          console.error('Recognition error:', event.error);
          this.isListening = false;
          this.cdr.detectChanges();
        };
      }
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'ar' ? 'fr-FR' : 'ar';
    if (this.recognition) {
      this.recognition.lang = this.currentLanguage;
    }
    this.cdr.detectChanges();
  }

  startListening() {
    console.log('Button clicked - isListening:', this.isListening);
    
    if (!this.recognition) {
      console.error('Recognition not supported');
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur.');
      return;
    }

    if (this.isListening) {
      console.log('Stopping recognition');
      this.recognition.stop();
      this.isListening = false;
    } else {
      console.log('Starting recognition');
      this.recognition.start();
      this.isListening = true;
    }
    this.cdr.detectChanges();
  }
}