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
      "codificacion": "1.01.01.01"
    },
    {
      "codigoCuenta": "01",
      "nombreCuenta": "Banco BERSA c/c",
      "tipoCuenta": "Activo",
      "rubroAsociado": "Banco",
      "codificacion": "1.01.02.01"
    },
    
  ];

  agregarCuentaContable(nuevaCuenta) {
    this.cuentasContables.push(nuevaCuenta);
  };

}