import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth-token';
  private loginUrl = 'login';

  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email: userName, password }).pipe(
      tap((res) => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
