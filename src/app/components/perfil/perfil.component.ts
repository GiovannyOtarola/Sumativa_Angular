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
  usuarios: any[] = [];
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
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuariosService.getJsonData().subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
        console.log('Usuarios cargados:', this.usuarios); // Verifica los usuarios cargados
      },
      error => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  loadLoggedInUser(): void {
    this.loggedInUser = this.sessionService.getLoggedInUser();
    if (this.loggedInUser) {
      this.perfilForm.patchValue(this.loggedInUser);
    } else {
      console.error('No se pudo cargar el usuario logueado');
    }
  }
  modificar(usuario: any): void {
    if (this.perfilForm.valid) {
      const email = usuario.email;
      const index = this.usuarios.findIndex((elemento: any) => elemento.email === email);
  
      console.log('Email del usuario:', email);
      console.log('Índice encontrado:', index);
      console.log('Usuarios actuales:', this.usuarios); 
  
      if (index !== -1) {
        this.usuarios[index].nombre_completo = this.perfilForm.get('nombre_completo')?.value;
        this.usuarios[index].usuario = this.perfilForm.get('usuario')?.value;
        this.usuarios[index].email = this.perfilForm.get('email')?.value;
        this.usuarios[index].fecha_nacimiento = this.perfilForm.get('fecha_nacimiento')?.value;
        this.usuarios[index].direccion_despacho = this.perfilForm.get('direccion_despacho')?.value;
        this.usuarios[index].password = this.perfilForm.get('password')?.value;
  
        this.usuariosService.actualizarUsuario(this.usuarios[index]).subscribe(
          response => {
            console.log('Datos actualizados:', response);
            alert('Datos actualizados correctamente');
          },
          error => {
            console.error('Error al actualizar los datos:', error);
            alert('Error al actualizar los datos');
          }
        );
  
      } else {
        window.alert('El elemento de la lista no existe');
      }
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.modificar(this.loggedInUser);
    } else {
      this.perfilForm.markAllAsTouched();
    }
  }
  
}
