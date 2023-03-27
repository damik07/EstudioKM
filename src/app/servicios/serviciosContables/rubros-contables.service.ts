import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class RubrosContablesService {
  
  rubrosContables?:any=[
    
    {
      "codigoRubro": "1",
      "nombreRubro": "Activo",
      "Nivel": "1",
      "tipoCuenta": "Activo",
      "rubroSuperior": "",
      "codificacion": "1.00.00.00"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Caja y Banco",
      "Nivel": "2",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Activo",
      "codificacion": "1.01.00.00"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Caja",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Caja y Banco",
      "codificacion": "1.01.01.00"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Banco BERSA c/c",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Caja y Banco",
      "codificacion": "1.01.02.00"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Deudores por ventas",
      "Nivel": "2",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Activo",
      "codificacion": "1.02.00.00"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Deudores por ventas",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Deudores por ventas",
      "codificacion": "1.02.01.00"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Deudores morosos",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Deudores por ventas",
      "codificacion": "1.02.02.00"
    }
    
  ];

  agregarRubroContable(nuevoRubro) {
    this.rubrosContables.push(nuevoRubro);
  };

}