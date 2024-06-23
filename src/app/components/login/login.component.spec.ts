import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * @description
 * Pruebas unitarias para el componente login.
 * 
 * Conjunto de pruebas para la validacion del formulario de inicio de sesion.
 */
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  
  /**
   * Configuracion inicial para el conjunto de pruebas.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,CommonModule,
        RouterModule.forRoot([])]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario de inicio de sesion se inicialice correctamente.
   * Se asegura que los campos email y password esten definidos.
   */
  it('LoginForm inicia Correctamente',() => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('emal')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  })

});
