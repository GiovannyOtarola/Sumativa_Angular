import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { IndexComponent } from './components/index/index.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';


export const routes: Routes = [
    //esto indica cual es la primera pagina que se debe inicar junto con la app
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'index', component: IndexComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'recuperacion', component: RecuperacionComponent}

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export class RegistroModule { }

 