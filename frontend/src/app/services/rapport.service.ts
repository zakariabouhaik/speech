import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private baseUrl = 'http://localhost:8081/rapports';

  constructor(private http: HttpClient) { }

  creerRapport(rapport: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, rapport);
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
