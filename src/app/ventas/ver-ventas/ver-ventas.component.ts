import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FacturasVentasService } from '../../servicios/serviciosContables/facturas-ventas.service';

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.css']
})
export class VerVentasComponent implements OnInit {

  data?:any;
  filtro?:any[];
  objetoAEditar:any;
  formulario: FormGroup;

  constructor(private ventas:FacturasVentasService) {
    
   }

  ngOnInit() {
    this.formulario = new FormGroup({
      fecha_comprobante: new FormControl(),
      tipo_comprobante: new FormControl(),
      controlador_fiscal: new FormControl(),
      punto_venta: new FormControl(),
      n_comprobante: new FormControl(),
      n_comprobante_registrado: new FormControl(),
      cant_hojas: new FormControl(),
      cod_tipo_doc_receptor: new FormControl(),
      n_documento_receptor: new FormControl(),
      nombre_receptor: new FormControl(),
      imp_total_operacion: new FormControl(),
      imp_total_no_gravado: new FormControl(),
      imp_neto_gravado: new FormControl(),
      impuesto_liquidado_iva: new FormControl(),
      percepcion_no_categorizados: new FormControl(),
      importe_op_exentas: new FormControl(),
      importe_pago_cuenta_imp_nac: new FormControl(),
      importe_perc_ii_bb: new FormControl(),
      importe_perc_imp_municipales: new FormControl(),
      importe_imp_internos: new FormControl(),
      transporte: new FormControl(),
      tipo_responsable: new FormControl(),
      cod_moneda: new FormControl(),
      tipo_cambio: new FormControl(),
      cod_alicuota_iva: new FormControl(),
      cod_operacion: new FormControl(),
      cae: new FormControl(),
      fecha_venc_cae: new FormControl(),
      fecha_anulacion_comprobante: new FormControl(),
      cuenta: new FormControl(),
      fecha_imputacion: new FormControl()
    });
  }

  ngDoCheck() {

  }


  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const ventas = this.ventas.facturasVentas;
    const datosFiltrados1 = ventas.filter(dato => 
      new Date(dato.fecha_imputacion).getMonth() >= new Date(formData.startDate1).getMonth()
    );
    const dfiltro1 = datosFiltrados1.filter(dato =>
      new Date(dato.fecha_imputacion).getFullYear() >= new Date(formData.startDate1).getFullYear()
    );
    const datosFiltrados2 = dfiltro1.filter(dato => 
      new Date(dato.fecha_imputacion).getMonth() <= new Date(formData.endDate1).getMonth()
    );
    this.filtro = datosFiltrados2.filter(dato =>
      new Date(dato.fecha_imputacion).getFullYear() <= new Date(formData.endDate1).getFullYear()
    );

    console.log(this.filtro);
    


  };


  eliminarVenta(item:any){
    console.log(item);
    //this.datosPorfolio.borrarEducacion(educacion).subscribe(()=>{
      //this.ngOnInit();
      //this.educacionList = this.educacionList.filter( (t:any) =>{return t.id !== educacion.id})
      alert("La venta seleccionada se a eliminado correctamente");
      
    //}
    //);

  }

  editarVenta(item:any){
    this.objetoAEditar = item;
    console.log(this.objetoAEditar);
    //this.datosPorfolio.borrarEducacion(educacion).subscribe(()=>{
      //this.ngOnInit();
      //this.educacionList = this.educacionList.filter( (t:any) =>{return t.id !== educacion.id})
      //alert("La venta seleccionada se a eliminado correctamente");
      
    //}
    //);

  }

}