import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor() {
    this.authState.next(this.isAuthenticated()); // Inicializar el estado al inicio
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('sessionActive') === 'true';
    }
    return false;
  }

  getAuthState() {
    return this.authState.asObservable();
  }

  login(user: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('sessionActive', 'true');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.authState.next(true);
      window.location.reload();
    }
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sessionActive');
      localStorage.removeItem('loggedInUser');
      this.authState.next(false);
    }
  }
}