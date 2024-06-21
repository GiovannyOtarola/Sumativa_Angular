import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  perfilForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.perfilForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      direccion_despacho: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z]).{6,18}$/)]]
    });
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

    // Verificar si localStorage está disponible
    private isLocalStorageAvailable(): boolean {
      try {
        const testKey = '__localStorageTest__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }

    cargarDatosUsuario(): void {
      if (this.isLocalStorageAvailable()) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const storedUserList = localStorage.getItem('userList');
          if (storedUserList) {
            const userList = JSON.parse(storedUserList);
            const user = userList.find((u: any) => u.email === JSON.parse(loggedInUser).email);
            if (user) {
              this.perfilForm.patchValue(user);
            }
          }
        }
      } 
    }
  

    onSubmit(): void {
      if (this.perfilForm.valid) {
        const updatedUser = this.perfilForm.value;
        if (this.isLocalStorageAvailable()) {
          const storedUserList = localStorage.getItem('userList');
          if (storedUserList) {
            let userList = JSON.parse(storedUserList);
            const userIndex = userList.findIndex((u: any) => u.email === updatedUser.email);
            if (userIndex !== -1) {
              // Actualizar la información del usuario en la lista
              userList[userIndex] = updatedUser;
  
              // Guardar la lista actualizada en localStorage
              localStorage.setItem('userList', JSON.stringify(userList));
  
              // Actualizar la información del usuario logueado en localStorage
              localStorage.setItem('loggedInUser', JSON.stringify({
                email: updatedUser.email,
                nombre_completo: updatedUser.nombre_completo
              }));
  
              console.log('Datos actualizados:', updatedUser);
              alert('Datos actualizados correctamente');
            } else {
              console.error('Usuario no encontrado en la lista');
            }
          } else {
            console.error('No se encontraron datos de usuario almacenados');
          }
        } 
      } else {
        this.perfilForm.markAllAsTouched();
      }
    }
}
