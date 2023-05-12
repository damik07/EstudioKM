import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import * as XLSX from 'xlsx';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { createWorker, createScheduler, Worker } from 'tesseract.js';

@Component({
  selector: 'app-imp-extractos-bancarios',
  templateUrl: './imp-extractos-bancarios.component.html',
  styleUrls: ['./imp-extractos-bancarios.component.css']
})
export class ImpExtractosBancariosComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];
  data?:any[];
  cuenta?:any[];
  dataDebe?:any[];
  dataHaber?:any[];
  formato: any;
  modelo: any;
  selecCuenta: any;
  asientos?:any[] = [];
  totalDebe:any = 0
  totalHaber:any = 0

  constructor(private cuentas:CuentasContablesService) {
    this.cuenta = cuentas.cuentasContables;

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

          // ACÁ HABRIA QUE AGREGAR DIFERENTES IF PARA IDENTIFICAR EL FORMATO DE ARCHIVO A ABRIR Y EL MODELO DE FORMATO SEGÚN EL BANCO PARA PDF


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
    if(this.formato === "1") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        /* lee el archivo */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });

        /* grava la primera hoja */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        /* guarda la info */
        this.data = <any>(XLSX.utils.sheet_to_json(ws,{ header: ["fecha","importe","referencia","descripcion"],range: 1, rawNumbers:false }));
        
              
        console.log(this.data);

        

        
      };

      
      reader.readAsBinaryString(file);

    } else if(this.formato === "2"){
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const typedArray = new Uint8Array(e.target.result);
        const loadingTask = (window as any).pdfjsLib.getDocument(typedArray);

        loadingTask.promise.then((pdf: PDFDocumentProxy) => {
          // Obtener la primera página del PDF
          pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Establecer el tamaño del canvas
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            // Renderizar la página en el canvas
            page.render(renderContext).promise.then(() => {
              // Leer los datos de la tabla del canvas
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const tableData = this.extractTableDataFromImageData(imageData);

              // Utilizar los datos de la tabla como desees
              console.log(tableData);
            });
          });
        });
      };

      fileReader.readAsArrayBuffer(file);

      


    }

    
  }

  
  //async extractTableDataFromPDF(file: File): Promise<any[]> {
    //const worker: Worker = createWorker();
    //const scheduler = createScheduler();
  
    //await worker.load();
   // await worker.loadLanguage('eng');
   // await worker.initialize('eng');
  
    //await scheduler.addWorker(worker);
  
    //const { data: { text } } = await scheduler.addJob('recognize', file);
    
    //await scheduler.terminate();
  
    // Procesa el texto extraído para obtener los datos de la tabla
  
    // ... Aquí puedes aplicar algoritmos de segmentación y procesamiento para identificar las columnas y filas
  
    // Retorna los datos de la tabla en un formato adecuado
    //return tableData;
  //}




  extractTableDataFromImageData(imageData: ImageData): any[] {
    const tableData: any[] = [];
    const { width, height, data } = imageData;

    // Supongamos que la tabla tiene 6 columnas y 10 filas
    const numColumns = 6;
    const numRows = 10;

    // Calcula el ancho y alto de cada celda en la imagen
    const cellWidth = Math.floor(width / numColumns);
    const cellHeight = Math.floor(height / numRows);

    for (let row = 0; row < numRows; row++) {
      const rowData: any = {};

      for (let col = 0; col < numColumns; col++) {
        const cellData: any[] = [];

        // Calcula las coordenadas de inicio y fin de cada celda
        const startX = col * cellWidth;
        const endX = startX + cellWidth;
        const startY = row * cellHeight;
        const endY = startY + cellHeight;

        // Recorre los píxeles de la celda y extrae los datos
        for (let y = startY; y < endY; y++) {
          for (let x = startX; x < endX; x++) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const value = `rgb(${r}, ${g}, ${b})`;

            // Aquí puedes aplicar lógica adicional según el formato y contenido de la celda
            cellData.push(value);
          }
        }

        // Asigna los datos de la celda a la columna correspondiente en la fila actual
        rowData[`column${col + 1}`] = cellData;
      }

      // Agrega la fila completa a los datos de la tabla
      tableData.push(rowData);
    }

    return tableData;

  }

  guardar(){

  }





}