import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.authService.login({
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Login response:', response); // Debug log
        localStorage.setItem('accessToken', response.token);
        const username = this.authService.getUsernameFromToken(response.token);
        localStorage.setItem('username', username);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert('Login failed! ' + err.error.message),
    });
  }
}
