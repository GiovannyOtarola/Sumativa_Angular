import { Component } from '@angular/core';
import { AuthService } from '../services/services.component';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthService,private router: Router) {}

  /**
   * Metodo que se ejecuta al inicializar el componente.
   * 
   * Carga el estado de autenticacion y la lista de usuarios almacenados  en el localStorage.
   */
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.authService.getAuthState().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });

    this.cargarUsuarios();
   
  }

  /**
   * Carga la lista de usuarios desde el localStorage.
   * 
   * Si no existen usuarios almacenados, se imprime un mensaje en la consola.
   */
  cargarUsuarios(): void {
    if (typeof localStorage !== 'undefined') {
      const storedUserList = localStorage.getItem('userList');
      if (storedUserList) {
        this.usuarios = JSON.parse(storedUserList);
      } else {
        console.log('No hay usuarios almacenados en localStorage.');
        // Puedes manejar el caso donde no hay usuarios, por ejemplo, redireccionando o mostrando un mensaje adecuado
      }
    } 
  }

  /**
   * Cierra la sesion del usuario y redirige a la pagina login.
   */
  logout(): void {
    this.authService.logout();
    // Redirigir a la página login
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
