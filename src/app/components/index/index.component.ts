import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../services/session.service';
import { JuegosService } from '../services/juegos.service';
import { CarritoService } from '../services/carrito.service';
/**
 * @description
 * Componente principal de la aplicacion
 * 
 * Este componente almacena los juegos que se mostraran en la pagina principal de la aplicacion
 */
export interface Juego{
  id: String;
  categoria: String;
  titulo: String;
  Image: String;
  precio: number;
  cantidad?: number;
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})



export class IndexComponent {

  /**
   * Lista de todos los juegos.
   */
  juegos: Juego[] = [];

  /**
   * Lista de juegos filtrados segun la categoria seleccionada.
   */
  juegosFiltrados: Juego[] = [];

  /**
   * Titulo principal que se muestra en la pagina.
   */
  tituloPrincipal: String = "Todos los Juegos";

  /**
   * Lista de juegos en el carrito.
   */
  juegosEnCarrito: Juego[] = [];

  /**
   * Numero de juegos en el carrito.
   */
  numeroCarrito: number = 0;
  isLoggedIn = false;

  constructor(private juegosService: JuegosService, private sessionService: SessionService, private carritoService: CarritoService) {}

/**
 * Inicializa el componente,estableciendo los juegos filtrados, el estado de autenticacion y cargando el carrito.
 */
ngOnInit(): void {
  this.cargarJuegos();
  this.isLoggedIn = this.sessionService.getSessionStatus();
   // Suscripción para escuchar cambios en el carrito
   this.carritoService.getCarrito().subscribe(carrito => {
    this.juegosEnCarrito = carrito;
    this.actualizarNumeroCarrito(); // Actualizar el número visible en el HTML
  });
}

/**
 * Carga la lista de juegos desde el servicio.
 */
cargarJuegos(): void {
  this.juegosService.getJsonData().subscribe(
    (data: Juego[]) => {
      this.juegos = data;
      this.juegosFiltrados = this.juegos;
    },
    (error) => {
      console.error('Error al cargar los juegos', error);
    }
  );
}

/**
 * Filtra la lista de juegos segun la categoria proporcionada
 * 
 * @param {String} categoria  -la categoria por la cual se debe filtrar. Si es 'todos', se muestran todos los juegos
 * @returns {void} - no retorna ningun valor
 * 
 */
  filtrarJuegos(categoria: string): void {
    if (categoria !== 'todos') {
      this.juegosFiltrados = this.juegos.filter(juego => juego.categoria === categoria);
      this.tituloPrincipal = categoria.charAt(0).toUpperCase() + categoria.slice(1); // Mostrar el nombre de la categoría como título principal
    } else {
      this.juegosFiltrados = this.juegos;
      this.tituloPrincipal = "Todos los Juegos";
    }
  }

  /**
   * Agrega un juego al carrito. si ya esta en el carrito incrementa la cantidad.
   * 
   * @param {Juego} juego - El juego que se agrega al carrito.
   */

  agregarAlCarrito(juego: Juego): void {
    const juegoEnCarrito = this.carritoService.getCarritoValue().find(j => j.id === juego.id);
  
    if (juegoEnCarrito) {
      // Si el juego ya está en el carrito, incrementar la cantidad
      this.carritoService.incrementarCantidad(juegoEnCarrito);
    } else {
      // Si el juego no está en el carrito, agregarlo con cantidad 1
      this.carritoService.agregarJuego({ ...juego, cantidad: 1 });
    }
  }
  /**
   * Actualiza el numero de juegos en el carrito que se muestra en el html del componente.
   */
  actualizarNumeroCarrito(): void {
    let nuevoNumero = this.juegosEnCarrito.reduce((acc, juego) => acc + (juego.cantidad || 0), 0);
    this.numeroCarrito = nuevoNumero; // Asignar el nuevo número a una propiedad del componente
  }



  /**
   * Cierra la sesion del usuario.
   */
  logout(): void {
    this.sessionService.logout();
    window.location.reload();
  }
}
