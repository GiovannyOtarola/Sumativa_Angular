import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Juego } from '../index/index.component';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Juego[] = [];
  private carritoSubject = new BehaviorSubject<Juego[]>(this.carrito);

  constructor() {}

  getCarrito() {
    return this.carritoSubject.asObservable();
  }

  getCarritoValue() {
    return this.carritoSubject.getValue();
  }
  
  agregarJuego(juego: Juego) {
    this.carrito.push(juego);
    this.carritoSubject.next(this.carrito);
  }

  incrementarCantidad(juego: Juego) {
    juego.cantidad = (juego.cantidad || 0) + 1;
    this.carritoSubject.next(this.carrito);
  }


  eliminarJuego(juego: Juego) {
    const index = this.carrito.findIndex(j => j.id === juego.id);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.carritoSubject.next(this.carrito);
    }
  }

  vaciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
  }
}