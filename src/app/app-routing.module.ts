import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { UsuarioComponent } from './modulos/usuarios/usuarios.component';
import { validaruserGuard } from './guards/validaruser.guard';
import { ProductoComponent } from './modulos/producto/producto.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    canActivate: [validaruserGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'productos', component: ProductoComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ],
  },

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
