import { Component, AfterViewInit, Inject, PLATFORM_ID,OnInit  } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router'; 

/**
 * @description
 * Componente de registro de usuarios.
 * 
 * Este componente permite a los usuarios registrarse proporcionando la informacion requerida.
 */
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  /**
   * 
   * @param {FormBuilder} fb -Constructor de formularios reactivos.
   * @param {Router} router -Servicio de enrutamiento de angular.
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre_completo: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', [Validators.required, this.edadMinimaValidator(13)]],
      direccion_despacho: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[A-Z]).{6,18}$/)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void { }

  /**
   * Maneja el envio del formulario de registro.
   * 
   * Si el formulario es valido, guarda los datos del usuario en el localStorage y redirige a la pagina de login.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      const userData = this.registroForm.value;

      // Obtener la lista de usuarios desde localStorage
      const storedUsers = localStorage.getItem('userList');
      const userList = storedUsers ? JSON.parse(storedUsers) : [];

      // Agregar el nuevo usuario a la lista
      userList.push(userData);

      // Guardar la lista actualizada de vuelta en localStorage
      localStorage.setItem('userList', JSON.stringify(userList));

      console.log('Datos guardados:', userList);

      // Redirigir a la página de login
      this.router.navigate(['/login']);
    } else {
      // Mostrar mensajes de error
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Valida que las contraseñas coincidan.
   * 
   * @param {AbstractControl} group -El grupo de controles que conitene las contraseñas.
   * @returns {Validators | null} -Retorna un objeto de errores de validacion si las contraseñas no coinciden, de lo contrario, null.
   */
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Valida la edad minima requerida del usuario.
   * 
   * @param {number} edadMinima -Edad minima requerida
   * @returns {(control: AbstractControl): ValidationErrors | null} -Retorna una funcion de validador.
   */
  edadMinimaValidator(edadMinima: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const today = new Date();
      const birthDate = new Date(control.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age < edadMinima ? { edadMinima: true } : null;
    };
  }
}