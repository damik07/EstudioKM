import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CargaFacturasCompraComponent } from './compras/carga-facturas-compra/carga-facturas-compra.component';
import { interceptorProvider } from './servicios/interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { CuentaContableComponent } from './plan-cuentas/cuenta-contable/cuenta-contable.component';
import { RubroComponent } from './plan-cuentas/rubro/rubro.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { VerCuentasComponent } from './plan-cuentas/ver-cuentas/ver-cuentas.component';
import { VerRubrosComponent } from './plan-cuentas/ver-rubros/ver-rubros.component';
import { VerPlanCuentasComponent } from './plan-cuentas/ver-plan-cuentas/ver-plan-cuentas.component';
import { ImportarVentasComponent } from './ventas/importar-ventas/importar-ventas.component';
import { VerVentasComponent } from './ventas/ver-ventas/ver-ventas.component';
import { AsientoDiarioComponent } from './asientos/asiento-diario/asiento-diario.component';
import { ImportarAsientosComponent } from './asientos/importar-asientos/importar-asientos.component';
import { ConciliacionBancariaComponent } from './bancos/conciliacion-bancaria/conciliacion-bancaria.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent, CargaFacturasCompraComponent, LoginComponent, CuentaContableComponent, RubroComponent, NavbarComponent, VerCuentasComponent, VerRubrosComponent, VerPlanCuentasComponent, ImportarVentasComponent, VerVentasComponent, AsientoDiarioComponent, ImportarAsientosComponent, ConciliacionBancariaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    NgxFileDropModule,
    HttpClientModule
  ],
  providers: [interceptorProvider, { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
