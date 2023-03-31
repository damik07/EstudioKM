import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaFacturasCompraComponent } from './compras/carga-facturas-compra/carga-facturas-compra.component';
import { LoginComponent } from './login/login/login.component';
import { CuentaContableComponent } from './plan-cuentas/cuenta-contable/cuenta-contable.component';
import { RubroComponent } from './plan-cuentas/rubro/rubro.component';
import { VerCuentasComponent } from './plan-cuentas/ver-cuentas/ver-cuentas.component';
import { VerPlanCuentasComponent } from './plan-cuentas/ver-plan-cuentas/ver-plan-cuentas.component';
import { VerRubrosComponent } from './plan-cuentas/ver-rubros/ver-rubros.component';

const routes: Routes = [
  {path:'cargaFacComp', component:CargaFacturasCompraComponent},
  {path:'rubro', component:RubroComponent},
  {path:'verCuentas', component:VerCuentasComponent},
  {path:'verRubros', component:VerRubrosComponent},
  {path:'verPlanCuentas', component:VerPlanCuentasComponent},
  
  {path:'cuentaContable', component:CuentaContableComponent},
  {path:'login', component:LoginComponent, //canActivate:[GuardGuard]
  },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
