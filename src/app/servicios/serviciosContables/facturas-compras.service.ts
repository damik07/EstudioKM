import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturasComprasService {

  facturasCompras?: any = [
    {
      fecha_factura: "01/01/2023",
      documento: "01",
      p_venta: "20",
      n_desde: "11465",
      n_hasta: "",
      cod_autoriz: "01",
      doc_emisor: "01",
      n_emisor: "30674549527",
      denominacion: "01",
      tc: "01",
      moneda: "01",
      neto_gravado: "01",
      neto_no_gravado: "01",
      op_exentas: "01",
      iva: "01",
      total: "01",
      cuenta: "01",
      fecha_imputacion: "01/01/2023",
      fecha_carga: "01/01/2023"
    }

  ];

  agregarFacturasCompras(nuevaFacturas) {
    this.facturasCompras.push(nuevaFacturas);
  };

}