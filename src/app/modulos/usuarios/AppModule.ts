import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { FooterComponent } from 'src/app/estructura/footer/footer.component';
import { HeaderComponent } from 'src/app/estructura/header/header.component';
import { NavComponent } from 'src/app/estructura/nav/nav.component';
import { CiudadComponent } from '../ciudad/ciudad.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { ComprasComponent } from '../compras/compras.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DepartamentoComponent } from '../departamento/departamento.component';
import { IntervencionDeUrgenciaComponent } from '../intervencion-de-urgencia/intervencion-de-urgencia.component';
import { LoginComponent } from '../login/login.component';
import { MarcaComponent } from '../marca/marca.component';
import { OrdenesDeServicioComponent } from '../ordenes-de-servicio/ordenes-de-servicio.component';
import { PrincipalComponent } from '../principal.component';
import { ProductoComponent } from '../producto/producto.component';
import { ProveedorComponent } from '../proveedor/proveedor.component';
import { ReporteComponent } from '../reporte/reporte.component';
import { RepuestosComponent } from '../repuestos/repuestos.component';
import { UsuariosComponent } from './usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    LoginComponent,
    UsuariosComponent,
    ProductoComponent,
    RepuestosComponent,
    ReporteComponent,
    ProveedorComponent,
    OrdenesDeServicioComponent,
    MarcaComponent,
    IntervencionDeUrgenciaComponent,
    DepartamentoComponent,
    ComprasComponent,
    ClienteComponent,
    CiudadComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
