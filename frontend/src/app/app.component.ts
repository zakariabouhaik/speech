import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentLanguage: string = 'fr';
  loggedInUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    localStorage.setItem('language', this.currentLanguage);
  }

  ngOnInit(): void {
    // Check saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }

    // Subscribe to user changes
    this.authService.currentUser$.subscribe(
      user => this.loggedInUser = user
    );

    // Check initial authentication state
    const username = localStorage.getItem('username');
    if (username) {
      this.authService.currentUserSubject.next({ username });
    }
  }

  logOut(): void {
    this.authService.logout();
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }

  toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'ar' ? 'fr' : 'ar';
    localStorage.setItem('language', this.currentLanguage);
  }
}
