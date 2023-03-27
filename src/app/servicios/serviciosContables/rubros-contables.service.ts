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
      "rubroSuperior": ""
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Caja y Banco",
      "Nivel": "2",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Activo"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Caja",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Caja y Banco"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Banco BERSA c/c",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Caja y Banco"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Deudores por ventas",
      "Nivel": "2",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Activo"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Deudores por ventas",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Deudores por ventas"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Deudores morosos",
      "Nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Deudores por ventas"
    }
    
  ];

  agregarRubroContable(nuevoRubro) {
    this.rubrosContables.push(nuevoRubro);
  };

}