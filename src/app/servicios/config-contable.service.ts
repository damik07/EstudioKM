import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class ConfigContableService {
  configContable?:any=[

    {
      "cuentaImportVentas": "1.01.01.01", //cuenta de crédito
      "cuentaImportCompras": "1.01.01.02", //cuenta de proveedores      
      "cuentaIvaCF": "1.01.01.03",
      "cuentaIvaDF": "1.01.01.04",
      "importe": 500000,
      "fechaMovimiento": "2023-02-01",
      "fechaCarga": "2023-02-01"
    }
  ];

}