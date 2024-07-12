import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { SessionService } from '../services/session.service';
import { of, throwError } from 'rxjs';


/**
 * Mock del servicio UsuariosService para las pruebas.
 */
class MockUsuariosService {
  authenticateUser(email: string, password: string) {
    if (email === 'test@example.com' && password === 'Test1234') {
      return of({ email: 'test@example.com', rol: 'usuario' });
    } else if (email === 'admin@example.com' && password === 'Admin1234') {
      return of({ email: 'admin@example.com', rol: 'admin' });
    } else {
      return of(null);
    }
  }
}

/**
* Mock del enrutador Router para las pruebas.
*/
class MockRouter {
  navigate(path: string[]) {}
}

/**
* Mock del servicio SessionService para las pruebas.
*/
class MockSessionService {
  login(user: any) {}
}

/**
 * @description
 * Pruebas unitarias para el componente login.
 * 
 * Conjunto de pruebas para la validacion del formulario de inicio de sesion.
 */

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usuariosService: UsuariosService;
  let sessionService: SessionService;
  let router: Router;
  
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
    usuariosService = TestBed.inject(UsuariosService);
    sessionService = TestBed.inject(SessionService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

   /**
   * Prueba para verificar que el formulario se inicializa correctamente.
   */
  it('debe inicializar formulario con los valores predeterminados', () => {
    const form = component.loginForm;
    expect(form).toBeDefined();
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
  });


  /**
   * Prueba para verificar que los campos se marcan como tocados cuando el formulario no es válido y no se envía.
   */
  it('debe marcar los campos como touch cuando el formulario no es valido y no es enviado', () => {
    spyOn(component.loginForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
  });

  /**
   * Prueba para verificar que el formulario no se envía si no es válido.
   */
  it('no debe enviar formulario si no es valido', () => {
    spyOn(usuariosService, 'authenticateUser');
    component.onSubmit();
    expect(usuariosService.authenticateUser).not.toHaveBeenCalled();
  });

  /**
   * Prueba para manejar el error de autenticación.
   */
  it('debe manejar el error de autenticacion', () => {
    component.loginForm.setValue({
      email: 'error@example.com',
      password: 'ErrorPassword'
    });

    spyOn(usuariosService, 'authenticateUser').and.returnValue(throwError('Error'));
    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.onSubmit();
    fixture.detectChanges(); 

    expect(window.alert).toHaveBeenCalledWith('Error al autenticar usuario');
    expect(console.error).toHaveBeenCalledWith('Error al autenticar usuario', 'Error');
  });

 
});
