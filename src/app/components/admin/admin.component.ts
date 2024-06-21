import { Component } from '@angular/core';
import { AuthService } from '../services/services.component';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.authService.getAuthState().subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });

    this.cargarUsuarios();
   
  }
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

  logout(): void {
    this.authService.logout();
    // Redirigir a la página principal
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
