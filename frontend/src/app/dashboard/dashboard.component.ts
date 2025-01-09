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
      next: (data) => this.rapports = data,
      error: (err) => console.error(err)
    });
  }
  createRapport(): void {
    this.router.navigate(['/rapport']);
  }
}
