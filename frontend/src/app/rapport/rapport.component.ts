import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RapportService } from '../services/rapport.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Rapport } from '../models/rapport.model';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
  rapportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rapportService: RapportService,
    private router: Router
  ) {
    this.rapportForm = this.fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.rapportForm.valid) {
      const rapport = {
        ...this.rapportForm.value,
        utilisateurId: 1 // Replace with actual user ID from auth service
      };

      this.rapportService.creerRapport(rapport).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating rapport:', error);
        }
      });
    }
  }
}