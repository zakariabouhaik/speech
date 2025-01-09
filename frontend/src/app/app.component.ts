import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Speech App</span>
      <span style="flex: 1 1 auto"></span>
      <button mat-button routerLink="/login">Login</button>
      <button mat-button routerLink="/register">Register</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}