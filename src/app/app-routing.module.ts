import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsientoDiarioComponent } from './asientos/asiento-diario/asiento-diario.component';
import { ImportarAsientosComponent } from './asientos/importar-asientos/importar-asientos.component';
import { ConciliacionBancariaComponent } from './bancos/conciliacion-bancaria/conciliacion-bancaria.component';
import { CargaFacturasCompraComponent } from './compras/carga-facturas-compra/carga-facturas-compra.component';
import { LoginComponent } from './login/login/login.component';
import { CuentaContableComponent } from './plan-cuentas/cuenta-contable/cuenta-contable.component';
import { RubroComponent } from './plan-cuentas/rubro/rubro.component';
import { VerCuentasComponent } from './plan-cuentas/ver-cuentas/ver-cuentas.component';
import { VerPlanCuentasComponent } from './plan-cuentas/ver-plan-cuentas/ver-plan-cuentas.component';
import { VerRubrosComponent } from './plan-cuentas/ver-rubros/ver-rubros.component';
import { ImportarVentasComponent } from './ventas/importar-ventas/importar-ventas.component';
import { VerVentasComponent } from './ventas/ver-ventas/ver-ventas.component';

const routes: Routes = [
  {path:'cargaFacComp', component:CargaFacturasCompraComponent},
  {path:'rubro', component:RubroComponent},
  {path:'verCuentas', component:VerCuentasComponent},
  {path:'verRubros', component:VerRubrosComponent},
  {path:'verPlanCuentas', component:VerPlanCuentasComponent},
  {path:'impVentas', component:ImportarVentasComponent},
  {path:'verVentas', component:VerVentasComponent},
  {path:'asientoDiario', component:AsientoDiarioComponent},
  {path:'importarAsientos', component:ImportarAsientosComponent},
  {path:'conciliacionBancaria', component:ConciliacionBancariaComponent},
  
  {path:'cuentaContable', component:CuentaContableComponent},
  {path:'login', component:LoginComponent, //canActivate:[GuardGuard]
  },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
