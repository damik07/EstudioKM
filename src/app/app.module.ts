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
import { SubRubroComponent } from './plan-cuentas/sub-rubro/sub-rubro.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent, CargaFacturasCompraComponent, LoginComponent, CuentaContableComponent, RubroComponent, SubRubroComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
