import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import * as XLSX from 'xlsx';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Component({
  selector: 'app-importar-asientos',
  templateUrl: './importar-asientos.component.html',
  styleUrls: ['./importar-asientos.component.css']
})
export class ImportarAsientosComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];
  data?:any[];
  dataDebe?:any[];
  dataHaber?:any[];
  cuentas?:any[];
  fechaImputacion: any = '';
  fechaAsiento: any;
  observaciones: any = '';
  asientos?:any[] = [];
  totalDebe:any = 0
  totalHaber:any = 0
  datePipe: DatePipe = new DatePipe('es');

  constructor(private cuenta:CuentasContablesService) {
    this.cuentas = cuenta.cuentasContables;
    registerLocaleData(localeEs)
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

      /* guardar la variables fijas */
      const fAsiento = ws["B2"];
      this.fechaAsiento = fAsiento['w'];

      const fImputacion = ws["B1"];
      this.fechaImputacion = fImputacion['w'];

      const observ = ws["B3"];
      this.observaciones = observ['v'];

      /* guarda la info */
      this.data = <any>(XLSX.utils.sheet_to_json(ws,{ header: ["codificacion","signoSaldo","importe"],range: 4, rawNumbers:false }));
      
      this.data = this.data.map((dataItem) => {
        const cuenta = this.cuentas.find((cuentaItem) => cuentaItem.codificacion === dataItem.codificacion);
        const obj = { ...dataItem, descCuenta: cuenta ? cuenta.nombreCuenta : '' };
        return obj;
      });
      
      console.log(this.data);

      this.dataDebe = this.data.filter((d) => 
      d.signoSaldo === "1"
      );

      this.dataHaber = this.data.filter((d) => 
      d.signoSaldo === "-1"
      );

      this.totalDebe = this.dataDebe.reduce((a, b) => a + parseFloat(b.importe), 0)
      this.totalHaber = this.dataHaber.reduce((a, b) => a + parseFloat(b.importe), 0)

      
    };

    
    reader.readAsBinaryString(file);

    
  }

  

  


  guardar(){
    const fecha = Date.parse(this.fechaAsiento);
    if (fecha && this.fechaImputacion && this.totalDebe === this.totalHaber && this.totalDebe != 0) {
      const tabla = document.getElementById('asientoDiarioDebe');
      const filas = tabla.getElementsByTagName('tr');
      for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const objetoDeFila = {
            idTransaccion: 1,
            codificacion: celdas[0].innerHTML,
            signoSaldo: 1,
            importe: parseFloat(celdas[2].innerHTML),
            fechaMovimiento: this.fechaAsiento,
            fechaImputacion: this.fechaImputacion,
            observaciones: this.observaciones,
            fecha_carga: new Date()

        };

        this.asientos.push(objetoDeFila);
      };

      const tabla1 = document.getElementById('asientoDiarioHaber');
      const filas1 = tabla1.getElementsByTagName('tr');
      for (let i = 1; i < filas1.length; i++) {
        const celdas1 = filas1[i].getElementsByTagName('td');
        const objetoDeFila = {
            idTransaccion: 1,
            codificacion: celdas1[0].innerHTML,
            signoSaldo: -1,
            importe: parseFloat(celdas1[2].innerHTML),
            fechaMovimiento: this.fechaAsiento,
            fechaImputacion: this.fechaImputacion,
            observaciones: this.observaciones,
            fecha_carga: new Date()

        };

        this.asientos.push(objetoDeFila);
      };
      console.log(this.asientos)


    } else if (!this.fechaAsiento){
      alert("No se ha ingresado fecha de asiento")
    } else if (!this.fechaImputacion){
      alert("No se ha ingresado fecha de imputación")
    } else if (this.totalDebe != this.totalHaber){
      alert("Existe una diferencia entre el total del valor del DEBE respecto al HABER")
    } else if (this.totalDebe === 0){
      alert("No se han ingresado importes a registrar")
    }
  } 

  


}