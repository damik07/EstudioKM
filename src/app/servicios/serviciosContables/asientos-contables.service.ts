import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class AsientosContablesService {
  asientosContables?:any=[

    {
      "id": "01",
      "idTransaccion": 1,      
      "codificacion": "1.01.01.01",
      "signoSaldo": -1,
      "importe": 500000,
      "fechaMovimiento": "2023-02-01",
      "fechaImputacion": "2023-02-01",
      "observaciones": "",
      "fechaCarga": "2023-02-01"
    },
    {
      "id": "01",
      "idTransaccion": 1,      
      "codificacion": "1.01.01.01",
      "signoSaldo": 1,
      "importe": 500000,
      "fechaMovimiento": "2023-02-01",
      "fechaImputacion": "2023-02-01",
      "observaciones": "",
      "fechaCarga": "2023-02-01"
    },
    
  ];

  agregarAsientoContable(asiento) {
    this.asientosContables.push(asiento);
  };
}