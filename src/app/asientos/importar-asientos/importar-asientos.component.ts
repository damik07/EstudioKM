import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import * as XLSX from 'xlsx';

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
  fechaAsiento: any = '';
  observaciones: any = '';
  asientos?:any[] = [];
  totalDebe:any = 0
  totalHaber:any = 0

  constructor(private cuenta:CuentasContablesService) {
    this.cuentas = cuenta.cuentasContables;
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
      this.fechaAsiento = fAsiento['v'];

      const fImputacion = ws["B1"];
      this.fechaImputacion = fImputacion['v'];

      const observ = ws["B3"];
      this.observaciones = observ['v'];

      /* guarda la info */
      this.data = <any>(XLSX.utils.sheet_to_json(ws,{ header: ["codificacion","signoSaldo","importe"],range: 4, rawNumbers:false }));
      console.log(this.data);
      console.log(this.fechaAsiento);
      console.log(this.fechaImputacion);
      console.log(this.observaciones);
      
    };
    reader.readAsBinaryString(file);

    //this.dataDebe = this.data.filter(d => {
     // d.signoSaldo === 1;
   // });

    //this.dataHaber = this.data.filter(d => {
     // d.signoSaldo === -1;
    //});

  }

  


  guardar(){

  }


}