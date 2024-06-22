import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/services.component';

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
 //Lista de Juegos
  juegos: Juego[] = [
    //Juegos play 5
    {
        id:"play51",
        categoria: "play5",
        titulo:"Play5 01",
        Image: "assets/images/play51.png",
        precio: 100,
    },
    {
      id:"play52",
      categoria: "play5",
      titulo:"Play5 02",
      Image: "assets/images/play52.png",
      precio: 100,
    },
    {
      id:"play53",
      categoria: "play5",
      titulo:"Play5 03",
      Image: "assets/images/play53.png",
      precio: 100,
    },
    {
      id:"play54",
      categoria: "play5",
      titulo:"Play5 04",
      Image: "assets/images/play5/play54.png",
      precio: 100,
    },
    //Juegos Swtich
    {
      id:"switch1",
      categoria: "switch",
      titulo:"switch 01",
      Image: "assets/images/switch/switch1.png",
      precio: 100,
    },
    {
      id:"switch2",
      categoria: "switch",
      titulo:"switch 02",
      Image: "assets/images/switch/switch2.png",
      precio: 100,
    },
    {
      id:"switch3",
      categoria: "switch",
      titulo:"switch 03",
      Image: "assets/images/switch/switch3.png",
      precio: 100,
    },
    {
      id:"switch4",
      categoria: "switch",
      titulo:"switch 04",
      Image: "assets/images/switch/switch4.png",
      precio: 100,
    },
  //Juegos Xbox
    {
      id:"xbox1",
      categoria: "xbox",
      titulo:"xbox 01",
      Image: "assets/images/xbox/xbox1.png",
      precio: 100,
    },
    {
      id:"xbox2",
      categoria: "xbox",
      titulo:"xbox 02",
      Image: "assets/images/xbox/xbox2.png",
      precio: 100,
    },
    {
      id:"xbox3",
      categoria: "xbox",
      titulo:"xbox 03",
      Image: "assets/images/xbox/xbox3.png",
      precio: 100,
    },
    {
      id:"xbox4",
      categoria: "xbox",
      titulo:"xbox 04",
      Image: "assets/images/xbox/xbox4.png",
      precio: 100,
    },
    //Juegos PC
    {
      id:"pc1",
      categoria: "pc",
      titulo:"pc 01",
      Image: "assets/images/pc/pc1.png",
      precio: 100,
    },
    {
      id:"pc2",
      categoria: "pc",
      titulo:"pc 02",
      Image: "assets/images/pc/pc2.png",
      precio: 100,
    },
    {
      id:"pc3",
      categoria: "pc",
      titulo:"pc 03",
      Image: "assets/images/pc/pc3.png",
      precio: 100,
    },
    {
      id:"pc4",
      categoria: "pc",
      titulo:"pc 04",
      Image: "assets/images/pc/pc4.png",
      precio: 100,
    },
    
  ];

  juegosFiltrados: Juego[];
  tituloPrincipal: String = "Todos los Juegos";
  juegosEnCarrito: Juego[] = [];

  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.juegosFiltrados = this.juegos;
  }

/**
 * Inicializa el componente,estableciendo los juegos filtrados, el estado de autenticacion y cargando el carrito desde el localStorage
 */
  ngOnInit(): void {
    this.juegosFiltrados = this.juegos;

    this.isLoggedIn = this.authService.isAuthenticated();

    this.authService.getAuthState().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });

    if (typeof localStorage !== 'undefined') {
      this.cargarCarritoDesdeLocalStorage();
    }
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
    const juegoEnCarrito = this.juegosEnCarrito.find(j => j.id === juego.id);

    if (juegoEnCarrito) {
      juegoEnCarrito.cantidad = (juegoEnCarrito.cantidad || 0) + 1;
    } else {
      this.juegosEnCarrito.push({ ...juego, cantidad: 1 });
    }

    this.actualizarNumeroCarrito();
    this.guardarCarritoEnLocalStorage();
  }

  /**
   * Actualiza el numero de juegos en el carrito que se muestra en el html del componente.
   */
  actualizarNumeroCarrito(): void {
    let nuevoNumero = this.juegosEnCarrito.reduce((acc, juego) => acc + (juego.cantidad || 0), 0);
    document.getElementById('numcarrito')!.innerText = `${nuevoNumero}`;
  }

  /**
   * Guarda el estado actual del carrito en el localStorage
   */
  guardarCarritoEnLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('juegos-en-carrito', JSON.stringify(this.juegosEnCarrito));
    }
  }

  /**
   * Carga el estado del carrito desde el localStorage.
   */
  cargarCarritoDesdeLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const juegosEnCarritoLS = localStorage.getItem('juegos-en-carrito');
      this.juegosEnCarrito = juegosEnCarritoLS ? JSON.parse(juegosEnCarritoLS) : [];
      this.actualizarNumeroCarrito();
    }
  }

  /**
   * Cierra la sesion del usuario.
   */
  logout(): void {
    this.authService.logout();
  }
}
