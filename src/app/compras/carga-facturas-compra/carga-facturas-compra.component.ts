import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AsientosContablesService } from 'src/app/servicios/serviciosContables/asientos-contables.service';
import { ConfigContableService } from 'src/app/servicios/serviciosContables/config-contable.service';
import * as XLSX from 'xlsx';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import { FacturasComprasService } from '../../servicios/serviciosContables/facturas-compras.service';

@Component({
  selector: 'app-carga-facturas-compra',
  templateUrl: './carga-facturas-compra.component.html',
  styleUrls: ['./carga-facturas-compra.component.css']
})
export class CargaFacturasCompraComponent implements OnInit {
  
  public files: NgxFileDropEntry[] = [];
  data?:any[];
  cuenta?:any[];
  facturas?:any[] = [];
  facturasRepet?:any[];
  fechaDeInicio: string;
  asientos?:any[] = [];
  

  constructor(private cuentas:CuentasContablesService, private compras:FacturasComprasService, private configContable:ConfigContableService, private asiento:AsientosContablesService) {
    this.cuenta = cuentas.cuentasContables;
    console.log(this.cuenta);
   }

  ngOnInit() {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Verificar que es un archivo
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Aquí puede acceder al archivo real
          console.log(droppedFile.relativePath, file);
          this.obtenerDatosExcel(file);

          /**
          // Podrías subirlo así:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Logotipo desinfectado devuelto desde el backend
          })
          **/

        });
      } else {
        // Era un directorio (se agregan directorios vacíos, de lo contrario solo archivos)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }


  obtenerDatosExcel(file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      /* lee el archivo */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      /* grava la primera hoja */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* guarda la info */
      this.data = <any>(XLSX.utils.sheet_to_json(ws,{ header: ["fecha","documento","p_venta","n_desde","n_hasta","cod_autoriz","doc_emisor","n_emisor","denominacion","tc","moneda","neto_gravado","neto_no_gravado","op_exentas","iva","total"],range: 2, rawNumbers:false }));
      console.log(this.data);
      
    };
    reader.readAsBinaryString(file);
  }

  obtenerValoresDeTabla() {
    if (this.fechaDeInicio) {
      let compras = this.compras.facturasCompras;
      const tabla = document.getElementById('importFactCompras');
      const filas = tabla.getElementsByTagName('tr');
      for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const existeCompra = compras.some(f => f.p_venta === celdas[2].innerHTML && f.n_desde === celdas[3].innerHTML && f.n_hasta === celdas[4].innerHTML && f.n_emisor === celdas[7].innerHTML);
        if (!existeCompra) {
          const objetoDeFila = {
            fecha_factura: celdas[0].innerHTML,
            documento: celdas[1].innerHTML,
            p_venta: celdas[2].innerHTML,
            n_desde: celdas[3].innerHTML,
            n_hasta: celdas[4].innerHTML,
            cod_autoriz: celdas[5].innerHTML,
            doc_emisor: celdas[6].innerHTML,
            n_emisor: celdas[7].innerHTML,
            denominacion: celdas[8].innerHTML,
            tc: celdas[9].innerHTML,
            moneda: celdas[10].innerHTML,
            neto_gravado: celdas[11].innerHTML,
            neto_no_gravado: celdas[12].innerHTML,
            op_exentas: celdas[13].innerHTML,
            iva: celdas[14].innerHTML,
            total: celdas[15].innerHTML,
            cuenta: celdas[16].querySelector('select').value,
            fecha_imputacion: this.fechaDeInicio,
            fecha_carga: new Date()

          };
          this.facturas.push(objetoDeFila);


          //agregar acá asientos contables
          
          //asiento de proveedores en el HABER         
          if(parseFloat(celdas[15].innerHTML) >0) {
            const proveedoresAsientos = {
              idTransaccion: 1,   //traer el id el asiento del documento - falta   
              codificacion: this.configContable.configContable.cuentaProveedoresCompras,
              signoSaldo: -1,
              importe: celdas[15].innerHTML,
              fechaMovimiento: celdas[0].innerHTML,
              fechaCarga: new Date()
            }
            this.asiento.agregarAsientoContable(proveedoresAsientos);
            this.asientos.push(proveedoresAsientos);

          }

          //asiento del IVA Crédito Fiscal
          if(parseFloat(celdas[14].innerHTML) >0) {
            const ivaAsientos = {
              idTransaccion: 1,   //traer el id el asiento del documento - falta   
              codificacion: this.configContable.configContable.cuentaIvaCF,
              signoSaldo: 1,
              importe: celdas[14].innerHTML,
              fechaMovimiento: celdas[0].innerHTML,
              fechaCarga: new Date()
            }
            this.asiento.agregarAsientoContable(ivaAsientos);
            this.asientos.push(ivaAsientos);

          }

          //asiento del gasto (importe neto gravado y total no gravado)
          if(parseFloat(celdas[12].innerHTML) >0) {
            const gastoAsientos = {
              idTransaccion: 1,   //traer el id el asiento del documento - falta   
              codificacion: celdas[16].querySelector('select').value,
              signoSaldo: 1,
              importe: (celdas[12].innerHTML + celdas[11].innerHTML),
              fechaMovimiento: celdas[0].innerHTML,
              fechaCarga: new Date()
            }
            this.asiento.agregarAsientoContable(gastoAsientos);
            this.asientos.push(gastoAsientos)

          }

          console.log(this.facturas);
          console.log(this.asientos);


          
        } else {
          this.facturasRepet = [];
          this.facturasRepet.push({
            fecha_factura: celdas[0].innerHTML,
            documento: celdas[1].innerHTML,
            p_venta: celdas[2].innerHTML,
            n_desde: celdas[3].innerHTML,
            n_hasta: celdas[4].innerHTML,
            cod_autoriz: celdas[5].innerHTML,
            doc_emisor: celdas[6].innerHTML,
            n_emisor: celdas[7].innerHTML,
            denominacion: celdas[8].innerHTML,
            tc: celdas[9].innerHTML,
            moneda: celdas[10].innerHTML,
            neto_gravado: celdas[11].innerHTML,
            neto_no_gravado: celdas[12].innerHTML,
            op_exentas: celdas[13].innerHTML,
            iva: celdas[14].innerHTML,
            total: celdas[15].innerHTML
          });
          console.log(this.facturasRepet);
          alert("Existen facturas repetidas que no fueron incorporadas a la base de datos");

        }
      }
    } else {
      alert("Debe seleccionar fecha de imputación");
    }
  }


  guardarBD() {
    console.log("agregar función POST luego de crear el backend, en data está la información, falta agregar la fecha")
    
  }

}