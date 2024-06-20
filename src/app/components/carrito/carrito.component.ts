import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Juego } from '../index/index.component';
import { AuthService } from '../services/services.component';

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

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.cargarCarritoDesdeLocalStorage();
  }

  eliminarDelCarrito(juego: Juego): void {
    const index = this.juegosEnCarrito.findIndex(j => j.id === juego.id);
    if (index !== -1) {
      this.juegosEnCarrito.splice(index, 1);
      this.guardarCarritoEnLocalStorage();
    }
  }

  vaciarCarrito(): void {
    this.juegosEnCarrito = [];
    this.guardarCarritoEnLocalStorage();
  }

  calcularTotal(): number {
    return this.juegosEnCarrito.reduce((acc, juego) => acc + (juego.cantidad || 0) * juego.precio, 0);
  }

  comprar(): void {
    
    alert('¡Compra realizada con éxito!');
    this.vaciarCarrito();
  }

  cargarCarritoDesdeLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const juegosEnCarritoLS = localStorage.getItem('juegos-en-carrito');
      this.juegosEnCarrito = juegosEnCarritoLS ? JSON.parse(juegosEnCarritoLS) : [];
    }
  }

  guardarCarritoEnLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('juegos-en-carrito', JSON.stringify(this.juegosEnCarrito));
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
