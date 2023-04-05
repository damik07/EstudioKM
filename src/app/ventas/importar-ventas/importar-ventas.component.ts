import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';

import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-importar-ventas',
  templateUrl: './importar-ventas.component.html',
  styleUrls: ['./importar-ventas.component.css']
})
export class ImportarVentasComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];
  data?:any[];
  cuenta?:any[];
  facturas?:any[] = [];
  fechaDeInicio: string;

  constructor(private cuentas:CuentasContablesService, private http: HttpClient) {
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
    reader.onload = () => {
      const lineas = reader.result.toString().split('\n');
      this.data = [];
      lineas.forEach((linea) => {
        if (linea.substring(0, 1).trim() === "1") {
          const registro = {
            fecha: linea.substring(1, 9).trim(),
            tipo_comprobante: linea.substring(9, 11).trim(),
            controlador_fiscal: linea.substring(11, 12).trim(),
            punto_venta: linea.substring(12, 16).trim(),
            n_comprobante: linea.substring(16, 24).trim(),
            n_comprobante_r: linea.substring(24, 32).trim(),
            cant_hojas: linea.substring(32, 35).trim(),
            cod_tipo_doc_receptor: linea.substring(35, 37).trim(),
            n_documento_receptor: linea.substring(37, 48).trim(),
            nombre_receptor: linea.substring(48, 78).trim(),
            imp_total_operacion: parseFloat((linea.substring(78, 93).trim().slice(0, -2) + '.' + linea.substring(78, 93).trim().slice(-2)).trim()),
            imp_total_no_gravado: linea.substring(93, 108).trim(),
            imp_neto_gravado: linea.substring(108, 123).trim(),
            impuesto_liquidado_iva: linea.substring(123, 138).trim(),
            percepcion_no_categorizados: linea.substring(138, 153).trim(),
            importe_op_exentas: linea.substring(153, 168).trim(),
            importe_pago_cuenta_imp_nac: linea.substring(168, 183).trim(),
            importe_perc_ii_bb: linea.substring(183, 198).trim(),
            importe_perc_imp_municipales: linea.substring(198, 213).trim(),
            importe_imp_internos: linea.substring(213, 228).trim(),
            transporte: linea.substring(228, 243).trim(),
            tipo_responsable: linea.substring(243, 245).trim(),
            cod_moneda: linea.substring(245, 248).trim(),
            tipo_cambio: linea.substring(248, 258).trim(),
            cod_alicuota_iva: linea.substring(258, 259).trim(),
            cod_operacion: linea.substring(259, 260).trim(),
            cae: linea.substring(260, 274).trim(),
            fecha_venc_cae: linea.substring(274, 282).trim(),
            fecha_anulacion_comp: linea.substring(282, 290).trim()
            
          };
          this.data.push(registro);
        }
      });
    };
    reader.readAsText(file);
    console.log(this.data);
  }
  
  

  obtenerValoresDeTabla() {
    const tabla = document.getElementById('importFactCompras');
    const filas = tabla.getElementsByTagName('tr');
    for (let i = 1; i < filas.length; i++) {
      const celdas = filas[i].getElementsByTagName('td');
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
      console.log(this.facturas);
    }
  }


  guardarBD() {
    console.log("agregar función POST luego de crear el backend, en data está la información, falta agregar la fecha")
    
  }



  

}