import { Component, OnInit } from '@angular/core';
import { RapportService } from '../services/rapport.service';
import {NgFor} from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  rapports: any[] = [];

  constructor(private rapportService: RapportService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRapports();
  }

  getAllRapports(): void {
    this.rapportService.getAllRapports().subscribe({
      next: (data) => {
        // Assuming `data` is an array of rapports
        this.rapports = data.map(rapport => ({
          titre: rapport.titre,  // Accessing the title
          contenu: rapport.contenu // Accessing the description
        }));
      },
      error: (err) => {
        console.error('Error fetching rapports:', err);
      }
    });
  }
  
  createRapport(): void {
    this.router.navigate(['/speech']);
  }
}
