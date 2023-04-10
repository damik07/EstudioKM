import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class FacturasVentasService {

  facturasVentas?:any=[
    
  ];

  agregarFacturasVentas(nuevaFacturas) {
    this.facturasVentas.push(nuevaFacturas);
  };

}