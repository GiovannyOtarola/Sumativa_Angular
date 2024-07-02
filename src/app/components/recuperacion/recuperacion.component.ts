import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { SessionService } from '../services/session.service';

/**
 * @description
 * Componente para recuperar la contraseña de un usuario.
 * 
 * Este componente permite recuperar la contraseña de un usuario ingresando su email.
 */
@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.scss'
})
export class RecuperacionComponent {
  

  constructor(private usuariosService: UsuariosService, private sessionService: SessionService){}

 
  mostrarPassword(): void {
    const email = (document.getElementById('usuarioEmail') as HTMLInputElement).value;

    if (email.trim() === '') {
      alert('Por favor ingresa un correo electrónico.');
      return;
    }

    this.usuariosService.buscarUsuarioPorEmail(email).subscribe(
      usuario => {
        if (usuario) {
          alert(`La contraseña del usuario ${usuario.email} es: ${usuario.password}`);
        } else {
          alert('No se encontró ningún usuario con el correo electrónico proporcionado.');
        }
      },
      error => {
        console.error('Error al buscar usuario por email', error);
        alert('Ocurrió un error al buscar usuario por email.');
      }
    );
  }

}
