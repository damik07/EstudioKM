import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class FacturasVentasService {

  facturasVentas?:any=[
    {
        "fecha_comprobante": "01/01/2023",
        "tipo_comprobante": "01",
        "controlador_fiscal": "01",
        "punto_venta": "0002",
        "n_comprobante": "00000116",
        "n_comprobante_registrado": "01",
        "cant_hojas": "01",
        "cod_tipo_doc_receptor": "01",
        "n_documento_receptor": "01",
        "nombre_receptor": "01",
        "imp_total_operacion": "01",
        "imp_total_no_gravado": "01",
        "imp_neto_gravado": "01",
        "impuesto_liquidado_iva": "01",
        "percepcion_no_categorizados": "01",
        "importe_op_exentas": "01",
        "importe_pago_cuenta_imp_nac": "01",
        "importe_perc_ii_bb": "01",
        "importe_perc_imp_municipales": "01",
        "importe_imp_internos": "01",
        "transporte": "01",
        "tipo_responsable": "01",
        "cod_moneda": "01",
        "tipo_cambio":"01",
        "cod_alicuota_iva": "01",
        "cod_operacion":"01",
        "cae":"01",
        "fecha_venc_cae":"01",
        "fecha_anulacion_comp":"01",
        "cuenta":"01",
        "fecha_imputacion":"01",
        "fecha_carga":"01"
    }
    
  ];

  agregarFacturasVentas(nuevaFacturas) {
    this.facturasVentas.push(nuevaFacturas);
  };

}