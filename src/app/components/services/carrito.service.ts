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

  agregarJuego(juego: Juego) {
    const juegoEnCarrito = this.carrito.find(j => j.id === juego.id);

    if (juegoEnCarrito) {
      juegoEnCarrito.cantidad = (juegoEnCarrito.cantidad || 0) + 1;
    } else {
      this.carrito.push({ ...juego, cantidad: 1 });
    }

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