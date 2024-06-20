import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        if (formData.email === parsedUserData.email && formData.password === parsedUserData.password) {
          console.log('Inicio de sesión exitoso');
          alert('Inicio de sesión exitoso');
          //almacenar estado de sesion 
          localStorage.setItem('sessionActive', 'true');
          localStorage.setItem('loggedInUser', JSON.stringify({ email: formData.email, nombre_completo: parsedUserData.nombre_completo }));
         
          
           // Redirigir al usuario a la página principal después del inicio de sesión exitoso
           this.router.navigate(['/principal']).then(() => {
            // Recargar la página después de redirigir
            window.location.reload();
          });
        } else {
          console.error('Correo o contraseña incorrectos');
          alert('Correo o contraseña incorrectos');
        }
      } else {
        console.error('No se encontraron datos de usuario almacenados');
        alert('No se encontraron datos de usuario almacenados');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}