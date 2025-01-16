import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
    public currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const username = this.getUsernameFromToken(response.token);
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('username', username);
        console.log('username',username);
        this.currentUserSubject.next({ username });
      })
    );
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    this.isAuthenticatedSubject.next(false);
  }
getUsernameFromToken(token: string): string {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub || '';
  } catch (error) {
    console.error('Error decoding token:', error);
    return '';
  }
}
isLoggedIn(): boolean {
  return this.isLocalStorageAvailable() && !!localStorage.getItem('accessToken');
}
private isLocalStorageAvailable(): boolean {
  try {
      return typeof localStorage !== 'undefined';
  } catch (e) {
      return false;
  }
}
}
