import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';

/**
 * @description
 * Pruebas unitarias para el componente de Registro.
 * 
 * Conjunto de pruebas que verifican las validaciones del formulario de registro
 */
describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  /**
   * Configuracion inicial para el conjunto de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el campo nombre_completo sea invalido si esta vacio
   */
  it('mostrar no valido si nombre_completo esta vacio',() =>{
    let nombreCompleto = component.registroForm.get('nombre_completo');
    nombreCompleto?.setValue('');
    expect(nombreCompleto?.valid).toBeFalsy();
    expect(nombreCompleto?.errors?.['required']).toBeTruthy();
  });

  /**
   * Verifica que el campo usuario sea invalido si esta vacio
   */
  it('mostrar no valido si usuario esta vacio', () => {
    let usuario = component.registroForm.get('usuario');
    usuario?.setValue('');
    expect(usuario?.valid).toBeFalsy();
    expect(usuario?.errors?.['required']).toBeTruthy();
  });

  /**
   * Verifica que el campo email sea invalido si esta vacio
   */
  it('mostrar no valido si email esta vacio', () => {
    let email = component.registroForm.get('email');
    email?.setValue('');
    expect(email?.valid).toBeFalsy();
    expect(email?.errors?.['required']).toBeTruthy();
  });

  /**
   * Verifica que el campo email sea invalido si el formato del email no es correcto
   */
  it('mostrar no valido si el formato del email no es correcto', () => {
    let email = component.registroForm.get('email');
    email?.setValue('invalid-email');
    expect(email?.valid).toBeFalsy();
    expect(email?.errors?.['email']).toBeTruthy();
  });

  /**
   * Verifica que el campo fecha_nacimiento sea invalido si esta vacio
   */
  it('mostrar no valido si campo fecha_nacimiento esta vacio', () => {
    let fechaNacimiento = component.registroForm.get('fecha_nacimiento');
    fechaNacimiento?.setValue('');
    expect(fechaNacimiento?.valid).toBeFalsy();
    expect(fechaNacimiento?.errors?.['required']).toBeTruthy();
  });

  /**
   * Verifica que el campo fecha_nacimiento sea invalido si la edad del usuario es menor a 13 años
   */
  it('mostrar no valido si la edad del usuario es menor a 13', () => {
    let fechaNacimiento = component.registroForm.get('fecha_nacimiento');
    fechaNacimiento?.setValue('2020-01-01'); // Fecha que hace que el usuario sea menor de 13
    expect(fechaNacimiento?.valid).toBeFalsy();
    expect(fechaNacimiento?.errors?.['edadMinima']).toBeTruthy();
  });

  /**
   * Verifica que el campo password sea invalido si la contraseña no cumple con el patron.
   */
  it('mostrar no valido si la contraseña no cumple con el patron', () => {
    let password = component.registroForm.get('password');
    password?.setValue('password'); // No cumple con el patron
    expect(password?.valid).toBeFalsy();
    expect(password?.errors?.['pattern']).toBeTruthy();
  });

  /**
   * Verifica que el campo confirm_password sea invalido si no coincide con el campo password.
   */
  it('mostrar no valido si confirm_password no coincide con la password', () => {
    let password = component.registroForm.get('password');
    let confirmPassword = component.registroForm.get('confirm_password');
    password?.setValue('Password1!');
    confirmPassword?.setValue('Different1!');
    component.registroForm.updateValueAndValidity();
    expect(component.registroForm.errors?.['passwordMismatch']).toBeTruthy();
  });

  /**
   * Verifica que el formulario sea valido si confirm_password coincide con password.
   */
  it('mostrar valido si confirm_password coincide con la contraseña', () => {
    let password = component.registroForm.get('password');
    let confirmPassword = component.registroForm.get('confirm_password');
    password?.setValue('Password1!');
    confirmPassword?.setValue('Password1!');
    component.registroForm.updateValueAndValidity();
    expect(component.registroForm.errors?.['passwordMismatch']).toBeFalsy();
  });
  
});
