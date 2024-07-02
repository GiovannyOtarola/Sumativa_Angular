import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { UsuariosService } from '../services/usuarios.service';
/**
 * @description
 * Componente para la pagina de administracion.
 * 
 * Este componente muestra la lista de los usuarios almacenado.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  isLoggedIn = false;
  usuarios: any[] = [];
  constructor(private sessionService: SessionService,private router: Router, private usuariosService: UsuariosService) {}

  /**
   * Metodo que se ejecuta al inicializar el componente.
   * 
   * Carga el estado de autenticacion y la lista de usuarios almacenados  en el localStorage.
   */
  ngOnInit(): void {
    this.isLoggedIn = this.sessionService.getSessionStatus();
  
    this.cargarUsuarios();
  }

  /**
   * Carga la lista de usuarios desde el localStorage.
   * 
   * Si no existen usuarios almacenados, se imprime un mensaje en la consola.
   */
  cargarUsuarios(): void {
    this.usuariosService.getJsonData().subscribe(
      (data: any[]) => {
        this.usuarios = data;
      },
      error => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  /**
   * Cierra la sesion del usuario y redirige a la pagina login.
   */
  logout(): void {
    this.sessionService.logout();
    // Redirigir a la página login
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
