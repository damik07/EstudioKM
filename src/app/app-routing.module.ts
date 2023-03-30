import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaFacturasCompraComponent } from './compras/carga-facturas-compra/carga-facturas-compra.component';
import { LoginComponent } from './login/login/login.component';
import { CuentaContableComponent } from './plan-cuentas/cuenta-contable/cuenta-contable.component';
import { RubroComponent } from './plan-cuentas/rubro/rubro.component';
import { VerCuentasComponent } from './plan-cuentas/ver-cuentas/ver-cuentas.component';

const routes: Routes = [
  {path:'cargaFacComp', component:CargaFacturasCompraComponent},
  {path:'rubro', component:RubroComponent},
  {path:'verCuentas', component:VerCuentasComponent},
  
  {path:'cuentaContable', component:CuentaContableComponent},
  {path:'login', component:LoginComponent, //canActivate:[GuardGuard]
  },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
