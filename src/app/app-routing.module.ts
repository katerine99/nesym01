import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modulos/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { validaruserGuard } from './guards/validaruser.guard';
import { ProductoComponent } from './modulos/producto/producto.component';
import { RepuestosComponent } from './modulos/repuestos/repuestos.component';
import { ReporteComponent } from './modulos/reporte/reporte.component';
import { ProveedorComponent } from './modulos/proveedor/proveedor.component';
import { OrdenesDeServicioComponent } from './modulos/ordenes-de-servicio/ordenes-de-servicio.component';
import { MarcaComponent } from './modulos/marca/marca.component';
import { IntervencionDeUrgenciaComponent } from './modulos/intervencion-de-urgencia/intervencion-de-urgencia.component';
import { DepartamentoComponent } from './modulos/departamento/departamento.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { CiudadComponent } from './modulos/ciudad/ciudad.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    canActivate: [validaruserGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'repuestos', component: RepuestosComponent },
      { path: 'reporte', component: ReporteComponent },
      { path: 'proveedor', component: ProveedorComponent },
      { path: 'ordenes_de_servicio', component: OrdenesDeServicioComponent },
      { path: 'marca', component: MarcaComponent },
      { path: 'intervencion_de_urgencia', component:IntervencionDeUrgenciaComponent },
      { path: 'departamento', component: DepartamentoComponent },
      { path: 'compras', component: ComprasComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'ciudad', component: CiudadComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ],
  },

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
