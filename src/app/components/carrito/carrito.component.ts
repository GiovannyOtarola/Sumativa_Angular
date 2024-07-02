import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Juego } from '../index/index.component';
import { CarritoService } from '../services/carrito.service';
import { IndexComponent } from '../index/index.component';
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

  constructor(private carritoService: CarritoService) { }

  /**
   * Inicializa el componente, estableciendo el estado de autenticacion y cargando el carrito desde el localStorage
   */
  ngOnInit(): void {
    this.actualizarNumeroCarrito();
    this.carritoService.getCarrito().subscribe(
      (carrito: Juego[]) => {
        this.juegosEnCarrito = carrito;
      },
      (error) => {
        console.error('Error al cargar el carrito', error);
      }
    );
  }
  actualizarNumeroCarrito(): void {
    // Lógica para actualizar el número del carrito, por ejemplo:
    this.carritoService.getCarrito().subscribe(carrito => {
      const nuevoNumero = carrito.length; // Obtener la longitud del carrito
      
    });
  }

  /**
   * Elimina un juego del carrito
   * @param {Juego} juego -El juego que sera eliminado del carrito.
   */
  eliminarDelCarrito(juego: Juego): void {
    this.carritoService.eliminarJuego(juego);
    this.actualizarNumeroCarrito(); // Asegurar actualización inmediata
  }

  /**
   * Vacia todo el carrito.
   */
  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
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

  

  
}
