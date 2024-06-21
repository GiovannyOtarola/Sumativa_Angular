import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.scss'
})
export class RecuperacionComponent {

  constructor(){}

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
