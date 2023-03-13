import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaFacturasCompraComponent } from './compras/carga-facturas-compra/carga-facturas-compra.component';

const routes: Routes = [
  {path:'cargaFacComp', component:CargaFacturasCompraComponent, //canActivate:[GuardGuard]
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
