import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminComponent } from './admin.component';
import { UsuariosService } from '../services/usuarios.service';
import { SessionService } from '../services/session.service';

/**
 * @description
 * Pruebas unitarias para el componente admin
 */
describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let usuariosService: UsuariosService;
  let sessionService: SessionService;

   /**
   * Configuracion inicial para cada prueba.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent,HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    usuariosService = TestBed.inject(UsuariosService);
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  /**
   * Prueba para verificar que el componente se crea correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
  * Prueba para verificar la función de eliminar usuario.
  */
  it('debe eliminar un usuario de la lista', () => {
    const mockUsuarios = [{ email: 'test@example.com', nombre: 'Test User' }];
    component.usuarios = mockUsuarios;
    const usuarioAEliminar = mockUsuarios[0];
  
    spyOn(window, 'alert');
    spyOn(usuariosService, 'MetodoUsuario');
  
    component.eliminar(usuarioAEliminar);
  
    expect(component.usuarios.length).toBe(0); // Verificar que el usuario se haya eliminado
    expect(usuariosService.MetodoUsuario).toHaveBeenCalledWith([]); // Verificar que se llamó a MétodoUsuario con la lista vacía
  });
  
  /**
  * Prueba para manejar el caso de usuario no encontrado en la lista.
  */
  it('debe manejar el usuario no encontrado en la lista', () => {
    spyOn(window, 'alert');
    spyOn(usuariosService, 'MetodoUsuario');
  
    component.eliminar({ email: 'nonexistent@example.com' });
  
    expect(window.alert).toHaveBeenCalledWith('El usuario con el correo electrónico no existe en la lista.');
    expect(usuariosService.MetodoUsuario).not.toHaveBeenCalled(); // Verificar que no se llamó a MétodoUsuario
  });

  
});
