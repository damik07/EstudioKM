import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaFacturasCompraComponent } from './compras/carga-facturas-compra/carga-facturas-compra.component';
import { CuentaContableComponent } from './plan-cuentas/cuenta-contable/cuenta-contable.component';
import { RubroComponent } from './plan-cuentas/rubro/rubro.component';
import { SubRubroComponent } from './plan-cuentas/sub-rubro/sub-rubro.component';

const routes: Routes = [
  {path:'cargaFacComp', component:CargaFacturasCompraComponent, //canActivate:[GuardGuard]
    },
  {path:'rubro', component:RubroComponent},
  {path:'subRubro', component:SubRubroComponent},
  {path:'cuentaContable', component:CuentaContableComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
