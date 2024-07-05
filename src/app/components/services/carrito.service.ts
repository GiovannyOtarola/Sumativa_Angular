import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Juego } from '../index/index.component';

/**
 * @description
 * Servicio para gestionar el carrito de compras.
 * 
 * Este servicio permite agregar, eliminar, incrementar la cantidad de juegos en el carrito, asi como vaciar el carrito y obtener el contenido actual del carrito.
 */
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  /**
   * Arreglo de juegos en el carrito.
   */
  private carrito: Juego[] = [];

  /**
   * Subject para emitir cambios en el carrito.
   */
  private carritoSubject = new BehaviorSubject<Juego[]>(this.carrito);

  constructor() {}

   /**
   * Obtiene el carrito como un Observable para poder suscribirse a sus cambios.
   * 
   * @returns {Observable<Juego[]>} - Observable que emite el contenido actual del carrito.
   */
  getCarrito() {
    return this.carritoSubject.asObservable();
  }

   /**
   * Obtiene el valor actual del carrito.
   * 
   * @returns {Juego[]} - Arreglo de juegos en el carrito.
   */
  getCarritoValue() {
    return this.carritoSubject.getValue();
  }
  
   /**
   * Agrega un juego al carrito y emite el nuevo estado del carrito.
   * 
   * @param {Juego} juego - El juego que se va a agregar al carrito.
   */
  agregarJuego(juego: Juego) {
    this.carrito.push(juego);
    this.carritoSubject.next(this.carrito);
  }

    /**
   * Incrementa la cantidad de un juego en el carrito y emite el nuevo estado del carrito.
   * 
   * @param {Juego} juego - El juego cuya cantidad se va a incrementar.
   */
  incrementarCantidad(juego: Juego) {
    juego.cantidad = (juego.cantidad || 0) + 1;
    this.carritoSubject.next(this.carrito);
  }

  /**
   * Elimina un juego del carrito y emite el nuevo estado del carrito.
   * 
   * @param {Juego} juego - El juego que se va a eliminar del carrito.
   */
  eliminarJuego(juego: Juego) {
    const index = this.carrito.findIndex(j => j.id === juego.id);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.carritoSubject.next(this.carrito);
    }
  }

  /**
   * Vacía el carrito y emite el nuevo estado del carrito.
   */
  vaciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
}