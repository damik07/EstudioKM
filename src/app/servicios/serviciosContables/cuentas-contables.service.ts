import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class CuentasContablesService {
  cuentasContables?:any=[

    {
      "codigoCuenta": "01",
      "nombreCuenta": "Caja Paraná",
      "tipoCuenta": "Activo",
      "rubroAsociado": "Caja",
      "codificacion": "1.00.00.00"
    },
    {
      "codigoCuenta": "01",
      "nombreCuenta": "Banco BERSA c/c",
      "tipoCuenta": "Activo",
      "rubroAsociado": "Banco",
      "codificacion": "1.00.00.00"
    },
    
  ];

  agregarCuentaContable(nuevaCuenta) {
    this.cuentasContables.push(nuevaCuenta);
  };

}