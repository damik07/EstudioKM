import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FacturasVentasService } from '../../servicios/serviciosContables/facturas-ventas.service';

@Component({
  selector: 'app-conciliacion-bancaria',
  templateUrl: './conciliacion-bancaria.component.html',
  styleUrls: ['./conciliacion-bancaria.component.css']
})
export class ConciliacionBancariaComponent implements OnInit {

  data?:any;
  filtro?:any[];
  objetoAEditar:any;
  formulario: FormGroup;

  constructor(private ventas:FacturasVentasService) { }

  ngOnInit() {
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

}