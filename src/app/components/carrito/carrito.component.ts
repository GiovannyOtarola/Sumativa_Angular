import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Juego } from '../index/index.component';
import { AuthService } from '../services/services.component';

/**
 * @description
 * Componente que maneja el carrito de compras.
 * 
 * Este componente permite ver, agregar, eliminar, vaciar los juegos en el carrito y realizar la compra.
 */
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {
 
  juegosEnCarrito: Juego[] = [];
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  /**
   * Inicializa el componente, estableciendo el estado de autenticacion y cargando el carrito desde el localStorage
   */
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.cargarCarritoDesdeLocalStorage();
  }

  /**
   * Elimina un juego del carrito
   * @param {Juego} juego -El juego que sera eliminado del carrito.
   */
  eliminarDelCarrito(juego: Juego): void {
    const index = this.juegosEnCarrito.findIndex(j => j.id === juego.id);
    if (index !== -1) {
      this.juegosEnCarrito.splice(index, 1);
      this.guardarCarritoEnLocalStorage();
    }
  }

  /**
   * Vacia todo el carrito.
   */
  vaciarCarrito(): void {
    this.juegosEnCarrito = [];
    this.guardarCarritoEnLocalStorage();
  }

  /**
   * Calcula el total a pagar por los juegos en el carrito
   * 
   * @returns {number} - El total a pagar
   */
  calcularTotal(): number {
    return this.juegosEnCarrito.reduce((acc, juego) => acc + (juego.cantidad || 0) * juego.precio, 0);
  }

  /**
   * Realiza la compra de los juegos en el carrito y vacia el carrito.
   */
  comprar(): void {    
    alert('¡Compra realizada con éxito!');
    this.vaciarCarrito();
  }

  /**
   * Carga el carrito desde el locarStorage
   */
  cargarCarritoDesdeLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const juegosEnCarritoLS = localStorage.getItem('juegos-en-carrito');
      this.juegosEnCarrito = juegosEnCarritoLS ? JSON.parse(juegosEnCarritoLS) : [];
    }
  }

  /**
   * Guarda el estado actual del carrito en el localStorage.
   */
  guardarCarritoEnLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('juegos-en-carrito', JSON.stringify(this.juegosEnCarrito));
    }
  }

  
}
