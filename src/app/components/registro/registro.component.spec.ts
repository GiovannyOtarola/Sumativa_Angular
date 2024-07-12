import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosService } from '../services/usuarios.service';
import { RegistroComponent } from './registro.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
/**
 * @description
 * Pruebas unitarias para el componente de Registro.
 * 
 * Conjunto de pruebas que verifican las validaciones del formulario de registro
 */

class MockUsuariosService {
  getJsonData() {
    return of([]);
  }
  MetodoUsuario(data: any) {}
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let usuariosService: UsuariosService;
  let router: Router;
  /**
   * Configuracion inicial para el conjunto de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    usuariosService = TestBed.inject(UsuariosService);
    router = TestBed.inject(Router);
    
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe devolver un error passwordMismatch si las passwords no coinciden', () => {
    const formGroup = component.registroForm;
    formGroup.get('password')?.setValue('Test1234');
    formGroup.get('confirm_password')?.setValue('Different123');

    const result = component.passwordMatchValidator(formGroup);

    expect(result).toEqual({ passwordMismatch: true });
  });

  

  it('debe validar los campos requeridos', () => {
    component.registroForm.setValue({
      nombre_completo: '',
      usuario: '',
      email: '',
      fecha_nacimiento: '',
      direccion_despacho: '',
      password: '',
      confirm_password: ''
    });

    component.onSubmit();

    expect(component.registroForm.get('nombre_completo')?.errors?.['required']).toBeTruthy();
    expect(component.registroForm.get('usuario')?.errors?.['required']).toBeTruthy();
    expect(component.registroForm.get('email')?.errors?.['required']).toBeTruthy();
    expect(component.registroForm.get('fecha_nacimiento')?.errors?.['required']).toBeTruthy();
    expect(component.registroForm.get('direccion_despacho')?.errors?.['required']).toBeTruthy();
    expect(component.registroForm.get('password')?.errors?.['required']).toBeTruthy();
    expect(component.registroForm.get('confirm_password')?.errors?.['required']).toBeTruthy();
  });

  it('debe validar la edad mínima correctamente', () => {
    // Configurar el formulario con una fecha que cumpla la edad mínima
    component.registroForm.setValue({
      nombre_completo: 'Test User',
      usuario: 'testuser',
      email: 'test@example.com',
      fecha_nacimiento: '2000-01-01', // Fecha de nacimiento que cumple con la edad mínima (13 años)
      direccion_despacho: 'Test Address',
      password: 'Test1234',
      confirm_password: 'Test1234'
    });

    // Obtener el control de fecha de nacimiento
    const fechaNacimientoControl = component.registroForm.get('fecha_nacimiento');

    // Validar la fecha de nacimiento
    const errors = fechaNacimientoControl?.errors;

    // Asegurarse de que no haya errores de edad mínima
    expect(errors).toBeNull();
  });

});
