import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private isLoggedIn: boolean = false;
  private loggedInUser: any = null;

  constructor() {}

  login(user: any): void {
    this.isLoggedIn = true;
    this.loggedInUser = user;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }

  getSessionStatus(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }
  
}