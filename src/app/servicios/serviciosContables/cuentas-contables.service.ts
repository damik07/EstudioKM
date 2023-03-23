import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class CuentasContablesService {
  cuentasContables?:any=[
    
  ];

  agregarCuentaContable(nuevaCuenta) {
    this.cuentasContables.push(nuevaCuenta);
  };

}