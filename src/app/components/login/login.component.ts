import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../services/usuarios.service';
import { SessionService } from '../services/session.service';

/**
 * @description
 * Componente de inicio de sesion.
 * 
 * Este componente permite al usuario iniciar sesion proporcionando su email y contraseña.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;

  /**
   * 
   * @param {FormBuilder} fb -Constructor de formularios reactivos.
   * @param {Router} router -Servicio de enrutamiento de angular.
   */
  constructor(private fb: FormBuilder, private router: Router, private usuariosService : UsuariosService, private sessionService : SessionService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  /**
   * Maneja el envio del formuario de inicio de sesion.
   * 
   * Si las credenciales son correctas, almacena el estado de la sesion en el localStorage y redirigue a la pagina index que muestra todos los juegos.
   * 
   * @returns {void} -no retorna ningun valor.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Verificar si las credenciales son del administrador
      if (formData.email === 'admin@gmail.com' && formData.password === 'Admin1234') {
        console.log('Inicio de sesión exitoso para el administrador');
        alert('Inicio de sesión exitoso para el administrador');

         // Establecer la sesión
         this.sessionService.login({ email: formData.email, nombre_completo: 'Administrador' });

        // Redirigir al componente de administración
        this.router.navigate(['/admin']);
        return;
      }
      
       // Verificar las credenciales de usuario normal
       this.usuariosService.authenticateUser(formData.email, formData.password).subscribe(
        matchedUser => {
          if (matchedUser) {
            console.log('Inicio de sesión exitoso');
            alert('Inicio de sesión exitoso');

            // Establecer la sesión
            this.sessionService.login(matchedUser);

            // Redirigir a la página principalss
            this.router.navigate(['/index']);
          } else {
            console.error('Correo o contraseña incorrectos');
            alert('Correo o contraseña incorrectos');
          }
        },
        error => {
          console.error('Error al obtener los datos de usuario', error);
          alert('Error al obtener los datos de usuario');
        }
      );

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}