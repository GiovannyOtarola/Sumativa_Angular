import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
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

      // Verificar si las credenciales son del administrador
      if (formData.email === 'admin@gmail.com' && formData.password === 'Admin1234') {
        console.log('Inicio de sesión exitoso para el administrador');
        alert('Inicio de sesión exitoso para el administrador');

        // Almacenar estado de sesión
        localStorage.setItem('sessionActive', 'true');
        localStorage.setItem('loggedInUser', JSON.stringify({ email: formData.email, nombre_completo: 'Administrador' }));

        // Redirigir al componente de administración
        this.router.navigate(['/admin']).then(() => {
          window.location.reload();
        });
        return; // Salir del método para evitar la lógica adicional
      }

      // usuarios normales
      const storedUserList = localStorage.getItem('userList');
      if (storedUserList) {
        const userList = JSON.parse(storedUserList);
        
        const matchedUser = userList.find((user: any) => 
          user.email === formData.email && user.password === formData.password
        );

        if (matchedUser) {
          console.log('Inicio de sesión exitoso');
          alert('Inicio de sesión exitoso');

          // Almacenar estado de sesión
          localStorage.setItem('sessionActive', 'true');
          localStorage.setItem('loggedInUser', JSON.stringify({ email: formData.email, nombre_completo: matchedUser.nombre_completo }));

          // Redirigir a la página principal
          this.router.navigate(['/index']).then(() => {
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