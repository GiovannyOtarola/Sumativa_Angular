import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(){}

   /**
   * Recupera y muestra la contraseña del usuario basado en el email ingresado.
   * 
   * Obtiene el email ingresado, busca en la lista de usuarios almacenados localmente
   * y muestra la contraseña del usuario si se encuentra.
   * 
   * Si no se encuentra ningún usuario con el email proporcionado, muestra una alerta.
   * Si no hay usuarios almacenados localmente, muestra una alerta indicando que no hay usuarios.
   * 
   * @returns {void} - Este método no retorna ningún valor.
   */
  mostrarPassword(): void {
    const email = (document.getElementById('usuarioEmail') as HTMLInputElement).value;
    const storedUserList = localStorage.getItem('userList');

    if(storedUserList){
      const usuarios = JSON.parse(storedUserList);

      //Buscar usuario por Email
      const usuario = usuarios.find((user: any) => user.email === email);
      if (usuario) {
        // Mostrar la contraseña en una alerta
        alert(`La contraseña del usuario ${usuario.email} es: ${usuario.password}`);
      } else {
        alert('No se encontró ningún usuario con el correo electrónico proporcionado.');
      }
    } else {
      alert('No hay usuarios almacenados.');
    }
  }

}
