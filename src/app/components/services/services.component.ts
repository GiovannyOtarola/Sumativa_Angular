import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @description
 * Servicio de autenticacion que maneja el estado de autenticacion del usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  /**
   * Inicializa el estado de autenticacion del servicio.
   */
  constructor() {
    this.authState.next(this.isAuthenticated()); // Inicializar el estado al inicio
  }

  /**
   * Verifica si el usuario esta autenticado
   * 
   * @returns {boolean} -Devuelve 'true' si el usuario esta autenticado y en caso contrario 'false'.
   */
  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('sessionActive') === 'true';
    }
    return false;
  }

  /**
   * Obtiene un observable que notifica el estado de autenticación.
   * 
   * @returns {Observable<boolean>} - Un observable que emite el estado de autenticación.
   */
  getAuthState() {
    return this.authState.asObservable();
  }

  /**
   * Cierra la sesion del usuario.
   * 
   * Elimina los datos de autenticación del almacenamiento local y actualiza el estado de autenticación.
   */
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sessionActive');
      localStorage.removeItem('loggedInUser');
      this.authState.next(false);
    }
  }
}