import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FacturasComprasService } from 'src/app/servicios/serviciosContables/facturas-compras.service';

@Component({
  selector: 'app-ver-compras',
  templateUrl: './ver-compras.component.html',
  styleUrls: ['./ver-compras.component.css']
})
export class VerComprasComponent implements OnInit {

  data?:any;
  filtro?:any[];
  objetoAEditar:any;
  formulario: FormGroup;

  constructor(private compras:FacturasComprasService) { }

  ngOnInit() {
  }

  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const compras = this.compras.facturasCompras;
    const datosFiltrados1 = compras.filter(dato => 
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