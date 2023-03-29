import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Opcion {
  codigoRubro: string;
  nombreRubro: string;
  nivel: string;
  tipoCuenta: string;
  rubroSuperior: string;
  codificacion: string;
}

@Injectable({
  providedIn:'root'})
export class RubrosContablesService {
  
  rubrosContables?:any=[
    
    {
      "codigoRubro": "1",
      "nombreRubro": "Activo",
      "nivel": "1",
      "tipoCuenta": "Activo",
      "rubroSuperior": "",
      "codificacion": "1.00.00.00"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Caja y Banco",
      "nivel": "2",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Activo",
      "codificacion": "1.01.00.00"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Caja",
      "nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Caja y Banco",
      "codificacion": "1.01.01.00"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Banco BERSA c/c",
      "nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Caja y Banco",
      "codificacion": "1.01.02.00"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Deudores por ventas",
      "nivel": "2",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Activo",
      "codificacion": "1.02.00.00"
    },
    {
      "codigoRubro": "01",
      "nombreRubro": "Deudores por ventas",
      "nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Deudores por ventas",
      "codificacion": "1.02.01.00"
    },
    {
      "codigoRubro": "02",
      "nombreRubro": "Deudores morosos",
      "nivel": "3",
      "tipoCuenta": "Activo",
      "rubroSuperior": "Deudores por ventas",
      "codificacion": "1.02.02.00"
    }
    
  ];

  agregarRubroContable(nuevoRubro) {
    this.rubrosContables.push(nuevoRubro);
  };

  getOpciones(): Observable<Opcion[]> {
    return of(this.rubrosContables);
  }

}