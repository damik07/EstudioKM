import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class FacturasComprasService {

  facturasCompras?:any=[
    
  ];

  agregarFacturasCompras(nuevaFacturas) {
    this.facturasCompras.push(nuevaFacturas);
  };

}