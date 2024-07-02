import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UsuariosService } from '../services/usuarios.service';
import { SessionService } from '../services/session.service';
import { HttpClientModule } from '@angular/common/http';/**
 * @description
 * Componente para gestionar perfil del usuario.
 * 
 * Este componente permite ver y actualizar la informacion del usuario que se le solicito en el registro.
 */
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  providers: [UsuariosService]
})
export class PerfilComponent {
  perfilForm: FormGroup;
  loggedInUser: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService,
    private sessionService: SessionService
  ) {
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
    this.loadLoggedInUser();
  }

  loadLoggedInUser(): void {
    this.loggedInUser = this.sessionService.getLoggedInUser();
    if (this.loggedInUser) {
      this.perfilForm.patchValue(this.loggedInUser);
    } else {
      console.error('No se pudo cargar el usuario logueado');
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      const updatedUser = this.perfilForm.value;
      this.usuariosService.actualizarUsuario(updatedUser).subscribe(
        response => {
          console.log('Datos actualizados:', response);
          this.sessionService.login(updatedUser); // Actualizar usuario logueado en sesión
          alert('Datos actualizados correctamente');
        },
        error => {
          console.error('Error al actualizar los datos:', error);
          alert('Error al actualizar los datos');
        }
      );
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
  
}
