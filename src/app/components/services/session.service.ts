import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @description
 * Servicio para gestionar la sesion del usuario.
 * 
 * Este servicio permite iniciar sesión, cerrar sesion y obtener el estado actual de la sesion y el usuario logueado.
 */
 
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * Estado de la sesion del usuario.
   * @private
   */
  private isLoggedIn: boolean = false;

  /**
   * Usuario logueado actualmente.
   * @private
   */
  private loggedInUser: any = null;

  constructor() {}

  /**
   * Inicia sesion del usuario.
   * 
   * @param {any} user - Informacion del usuario que inicia sesion.
   */
  login(user: any): void {
    this.isLoggedIn = true;
    this.loggedInUser = user;
  }

  /**
   * Cierra la sesion del usuario.
   */
  logout(): void {
    this.isLoggedIn = false;
    this.loggedInUser = null;
  }

   /**
   * Obtiene el estado actual de la sesion.
   * 
   * @returns {boolean} - `true` si el usuario esta logueado, `false` en caso contrario.
   */
  getSessionStatus(): boolean {
    return this.isLoggedIn;
  }

  /**
   * Obtiene la informacion del usuario logueado actualmente.
   * 
   * @returns {any} - Información del usuario logueado, o `null` si no hay ningún usuario logueado.
   */
  getLoggedInUser(): any {
    return this.loggedInUser;
  }
  
}