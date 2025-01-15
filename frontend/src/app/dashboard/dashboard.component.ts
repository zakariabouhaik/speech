import { Component, OnInit } from '@angular/core';
import { RapportService } from '../services/rapport.service';
import {DatePipe, NgFor} from '@angular/common';
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

  constructor(private rapportService: RapportService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllRapports();
  }

  getAllRapports(): void {
    this.rapportService.getAllRapports().subscribe({
      next: (data) => {
        this.rapports = data.map(rapport => ({
          titre: rapport.titre,          // Accessing the title
          contenu: rapport.contenu,      // Accessing the description
          nom: rapport.utilisateur?.username,
          dateCreation: rapport.dateCreation ? this.datePipe.transform(rapport.dateCreation, 'dd/MM/yyyy, HH:mm:ss') : ''  // Formatting the date
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
