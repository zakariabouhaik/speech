import { Component, inject, PLATFORM_ID, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RapportService } from '../services/rapport.service';
import { Rapport } from '../models/rapport.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-speech',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent implements OnInit {
  rapport: Rapport = {
    titre: '',
    contenu: '',
    utilisateur: {
      username: localStorage.getItem('username') || ''
    }
  };
  
  isListening = false;
  recognition: any;
  currentLanguage = 'fr-FR'; // Updated language code
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(private rapportService: RapportService, private authService: AuthService) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeRecognition();
    }
  }

  private initializeRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                             (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    this.recognition.lang = this.currentLanguage;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      console.log('Recognition started');
      this.isListening = true;
      this.cdr.detectChanges();
    };

    this.recognition.onend = () => {
      console.log('Recognition ended');
      this.isListening = false;
      this.cdr.detectChanges();
    };

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      
      console.log('Transcript:', transcript);
      this.rapport.contenu = transcript;
      this.cdr.detectChanges();
    };

    this.recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);
      this.isListening = false;
      this.cdr.detectChanges();
    };
  }

  startListening() {
    if (!this.recognition) {
      console.error('Recognition not supported');
      return;
    }

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Start recognition error:', error);
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'ar-SA' ? 'fr-FR' : 'ar-SA';
    if (this.recognition) {
      const wasListening = this.isListening;
      if (wasListening) {
        this.stopListening();
      }
      this.recognition.lang = this.currentLanguage;
      if (wasListening) {
        this.startListening();
      }
    }
  }

  createRapport() {
    this.rapportService.creerRapport(this.rapport).subscribe(
      (response) => {
        console.log('Rapport created successfully', response);
      },
      (error) => {
        console.error('Error creating rapport', error);
      }
    );
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.rapport.utilisateur = user.username;
      }
    });
  }
}