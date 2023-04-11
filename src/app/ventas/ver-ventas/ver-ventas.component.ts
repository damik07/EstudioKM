import { Component, OnInit } from '@angular/core';
import { FacturasVentasService } from '../../servicios/serviciosContables/facturas-ventas.service';

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.css']
})
export class VerVentasComponent implements OnInit {

  data?:any;
  filtro?:any[];

  constructor(private ventas:FacturasVentasService) { }

  ngOnInit() {
  }

  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const ventas = this.ventas.facturasVentas;
    const datosFiltrados1 = ventas.filter(dato => 
      new Date(dato.fecha_comprobante).getMonth() >= new Date(formData.startDate1).getMonth()
    );
    const dfiltro1 = datosFiltrados1.filter(dato =>
      new Date(dato.fecha_comprobante).getFullYear() >= new Date(formData.startDate1).getFullYear()
    );
    const datosFiltrados2 = dfiltro1.filter(dato => 
      new Date(dato.fecha_comprobante).getMonth() <= new Date(formData.endDate1).getMonth()
    );
    this.filtro = datosFiltrados2.filter(dato =>
      new Date(dato.fecha_comprobante).getFullYear() <= new Date(formData.endDate1).getFullYear()
    );

    




  };

}