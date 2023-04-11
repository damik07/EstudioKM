import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';

import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { FacturasVentasService } from '../../servicios/serviciosContables/facturas-ventas.service';

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
  facturasRepet?:any[];
  fechaDeInicio: string;

  constructor(private cuentas:CuentasContablesService, private http: HttpClient, private ventas:FacturasVentasService) {
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
                fecha: new Date(parseInt(linea.substring(1, 5).trim()), parseInt(linea.substring(5, 7).trim()) - 1, parseInt(linea.substring(7, 9).trim())).toLocaleDateString('en-GB'),
                tipo_comprobante: linea.substring(9, 11).trim(),
                controlador_fiscal: linea.substring(11, 12).trim(),
                punto_venta: linea.substring(12, 16).trim(),
                n_comprobante: linea.substring(16, 24).trim(),
                n_comprobante_registrado: linea.substring(24, 32).trim(),
                cant_hojas: linea.substring(32, 35).trim(),
                cod_tipo_doc_receptor: linea.substring(35, 37).trim(),
                n_documento_receptor: linea.substring(37, 48).trim(),
                nombre_receptor: linea.substring(48, 78).trim(),
                imp_total_operacion: parseFloat((linea.substring(78, 93).trim().slice(0, -2) + '.' + linea.substring(78, 93).trim().slice(-2)).trim()),
                imp_total_no_gravado: parseFloat((linea.substring(93, 108).trim().slice(0, -2) + '.' + linea.substring(93, 108).trim().slice(-2)).trim()),
                imp_neto_gravado: parseFloat((linea.substring(108, 123).trim().slice(0, -2) + '.' + linea.substring(108, 123).trim().slice(-2)).trim()),
                impuesto_liquidado_iva: parseFloat((linea.substring(123, 138).trim().slice(0, -2) + '.' + linea.substring(123, 138).trim().slice(-2)).trim()),
                percepcion_no_categorizados: parseFloat((linea.substring(138, 153).trim().slice(0, -2) + '.' + linea.substring(138, 153).trim().slice(-2)).trim()),
                importe_op_exentas: parseFloat((linea.substring(153, 168).trim().slice(0, -2) + '.' + linea.substring(153, 168).trim().slice(-2)).trim()),
                importe_pago_cuenta_imp_nac: parseFloat((linea.substring(168, 183).trim().slice(0, -2) + '.' + linea.substring(168, 183).trim().slice(-2)).trim()),
                importe_perc_ii_bb: parseFloat((linea.substring(183, 198).trim().slice(0, -2) + '.' + linea.substring(183, 198).trim().slice(-2)).trim()),
                importe_perc_imp_municipales: parseFloat((linea.substring(198, 213).trim().slice(0, -2) + '.' + linea.substring(198, 213).trim().slice(-2)).trim()),
                importe_imp_internos: parseFloat((linea.substring(213, 228).trim().slice(0, -2) + '.' + linea.substring(213, 228).trim().slice(-2)).trim()),
                transporte: parseFloat((linea.substring(228, 243).trim().slice(0, -2) + '.' + linea.substring(228, 243).trim().slice(-2)).trim()),
                tipo_responsable: linea.substring(243, 245).trim(),
                cod_moneda: linea.substring(245, 248).trim(),
                tipo_cambio: parseFloat((linea.substring(248, 252).trim().slice(0, 4) + '.' + linea.substring(252, 258).trim().slice(0, 6)).trim()),
                cod_alicuota_iva: linea.substring(258, 259).trim(),
                cod_operacion: linea.substring(259, 260).trim(),
                cae: linea.substring(260, 274).trim(),
                fecha_venc_cae: new Date(parseInt(linea.substring(274, 278).trim()), parseInt(linea.substring(278, 280).trim()) - 1, parseInt(linea.substring(280, 282).trim())).toLocaleDateString('en-GB'),
                fecha_anulacion_comp: new Date(parseInt(linea.substring(282, 286).trim()), parseInt(linea.substring(286, 288).trim()) - 1, parseInt(linea.substring(288, 290).trim())).toLocaleDateString('en-GB')


              };

              this.data.push(registro);
            };
        
      });
    };
    reader.readAsText(file);
    console.log(this.data);
  }

  

  obtenerValoresDeTabla() {
    if (this.fechaDeInicio) {
      let ventas = this.ventas.facturasVentas;
      const tabla = document.getElementById('importFactCompras');
      const filas = tabla.getElementsByTagName('tr');
      for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const existeVenta = ventas.some(f => f.punto_venta === celdas[3].innerHTML && f.n_comprobante === celdas[4].innerHTML);
        if (!existeVenta) {
          const objetoDeFila = {
            fecha_comprobante: celdas[0].innerHTML,
            tipo_comprobante: celdas[1].innerHTML,
            controlador_fiscal: celdas[2].innerHTML,
            punto_venta: celdas[3].innerHTML,
            n_comprobante: celdas[4].innerHTML,
            n_comprobante_registrado: celdas[5].innerHTML,
            cant_hojas: celdas[6].innerHTML,
            cod_tipo_doc_receptor: celdas[7].innerHTML,
            n_documento_receptor: celdas[8].innerHTML,
            nombre_receptor: celdas[9].innerHTML,
            imp_total_operacion: celdas[10].innerHTML,
            imp_total_no_gravado: celdas[11].innerHTML,
            imp_neto_gravado: celdas[12].innerHTML,
            impuesto_liquidado_iva: celdas[13].innerHTML,
            percepcion_no_categorizados: celdas[14].innerHTML,
            importe_op_exentas: celdas[15].innerHTML,
            importe_pago_cuenta_imp_nac: celdas[16].innerHTML,
            importe_perc_ii_bb: celdas[17].innerHTML,
            importe_perc_imp_municipales: celdas[18].innerHTML,
            importe_imp_internos: celdas[19].innerHTML,
            transporte: celdas[20].innerHTML,
            tipo_responsable: celdas[21].innerHTML,
            cod_moneda: celdas[22].innerHTML,
            tipo_cambio: celdas[23].innerHTML,
            cod_alicuota_iva: celdas[24].innerHTML,
            cod_operacion: celdas[25].innerHTML,
            cae: celdas[26].innerHTML,
            fecha_venc_cae: celdas[27].innerHTML,
            fecha_anulacion_comp: celdas[28].innerHTML,
            cuenta: celdas[29].querySelector('select').value,
            fecha_imputacion: this.fechaDeInicio,
            fecha_carga: new Date()
          };
          this.facturas.push(objetoDeFila);
          console.log(this.facturas);
        } else {
          this.facturasRepet = [];          
          this.facturasRepet.push({
            fecha_comprobante: celdas[0].innerHTML,
            tipo_comprobante: celdas[1].innerHTML,
            controlador_fiscal: celdas[2].innerHTML,
            punto_venta: celdas[3].innerHTML,
            n_comprobante: celdas[4].innerHTML,
            n_comprobante_registrado: celdas[5].innerHTML,
            cant_hojas: celdas[6].innerHTML,
            cod_tipo_doc_receptor: celdas[7].innerHTML,
            n_documento_receptor: celdas[8].innerHTML,
            nombre_receptor: celdas[9].innerHTML,
            imp_total_operacion: celdas[10].innerHTML,
            imp_total_no_gravado: celdas[11].innerHTML,
            imp_neto_gravado: celdas[12].innerHTML,
            impuesto_liquidado_iva: celdas[13].innerHTML,
            percepcion_no_categorizados: celdas[14].innerHTML,
            importe_op_exentas: celdas[15].innerHTML,
            importe_pago_cuenta_imp_nac: celdas[16].innerHTML,
            importe_perc_ii_bb: celdas[17].innerHTML,
            importe_perc_imp_municipales: celdas[18].innerHTML,
            importe_imp_internos: celdas[19].innerHTML,
            transporte: celdas[20].innerHTML,
            tipo_responsable: celdas[21].innerHTML,
            cod_moneda: celdas[22].innerHTML,
            tipo_cambio: celdas[23].innerHTML,
            cod_alicuota_iva: celdas[24].innerHTML,
            cod_operacion: celdas[25].innerHTML,
            cae: celdas[26].innerHTML,
            fecha_venc_cae: celdas[27].innerHTML,
            fecha_anulacion_comp: celdas[28].innerHTML
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