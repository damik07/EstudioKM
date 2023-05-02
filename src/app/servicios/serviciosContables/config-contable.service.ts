import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class ConfigContableService {
  configContable?:any=

    {
      "cuentaCreditoVentas": "1.01.01.01", //cuenta de crédito
      "cuentaProveedoresCompras": "1.01.01.02", //cuenta de proveedores      
      "cuentaIvaCF": "1.01.01.03",
      "cuentaIvaDF": "1.01.01.04",
      "cuentaVentas": "1.01.01.05",
      
    };

}