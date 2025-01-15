import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Rapport } from '../models/rapport.model';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private baseUrl = 'http://localhost:8081/rapports';

  constructor(private http: HttpClient) { }

  creerRapport(rapport: Rapport): Observable<Rapport> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<Rapport>(this.baseUrl, rapport, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Unauthorized! Please log in again.');
        }
        return throwError(error);
      })
    );
  }
  
  getAllRapports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getRapportsByUtilisateur(utilisateurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/utilisateur/${utilisateurId}`);
  }

  getRapportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateRapport(id: number, rapport: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, rapport);
  }

  deleteRapport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
