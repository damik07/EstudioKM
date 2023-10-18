import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';


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
  movimientosBancarios?:any[] = [];
  fechaDeInicio: string;
  asientos?:any[] = [];
  totalDebe:any = 0
  totalHaber:any = 0
  
  regexBancarios?:any=[

    {
      "nombreBanco": "Banco de Entre Ríos",
      "valor": "1",
      "regex": /(\d{2}\/\d{2}\/\d{2})\s+([\w\s.]+(?:\s[\w\s.]+)*)\s+([\d.]+(?:,\d{2})?)\s+([\d.]+(?:,\d{2})?)/g,
      "regexSaldoInicial": /Saldo del periodo anterior\s+([\d.]+(?:,\d{2})?)/
    },
    {
      "nombreBanco": "Banco Galicia",
      "valor": "4",
      "regex": /(\d{2}-\d{2})\s+([^\d]+)\s+(?!SALDO\sINICIAL)[^\w]+([^\s]+)\s+([\d.,]+)\s/g,
      "regexSaldoInicial": /SALDO INICIAL\s+([\d.]+(?:,\d{2})?)/
    }
    
  ];


  constructor(private cuentas:CuentasContablesService) {
    this.cuenta = cuentas.cuentasContables;

  

  }

  ngOnInit() {
    //pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js'; // Ruta al archivo pdf.worker.js
    //pdfjsLib.GlobalWorkerOptions.workerSrc = '/#/assets/pdf.worker.js'; // Ruta al archivo pdf.worker.js
    
    
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';
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
        console.log('Archivo no agregado a la cola de carga');
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

      } else if (this.formato === "2") {

        const reader = new FileReader();
        reader.onload = (e: any) => {
          /* lee el archivo */
          const arrayBuffer = e.target.result;
          const pdfData = new Uint8Array(arrayBuffer);

          /* lee el archivo PDF */
          pdfjsLib.getDocument({ data: pdfData }).promise.then((pdf) => {
            const totalPages = pdf.numPages;
            const textPromises = [];

            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
              textPromises.push(this.extractPageText(pdf, pageNumber));
            }

            Promise.all(textPromises).then((texts) => {
              this.data = [].concat(...texts); // Unir el texto de todas las páginas
            });
            console.log(this.data);
          });

          
        };

        reader.readAsArrayBuffer(file);
      }
              
          
        

      
    }
    
    extractPageText(pdf, pageNumber) {
      return new Promise((resolve, reject) => {
        pdf.getPage(pageNumber).then((page) => {
          page.getTextContent().then((textContent) => {
            const pageText = textContent.items.map((item) => item.str).join(' ');
            console.log(pageText);
            // Aquí puedes realizar la manipulación de texto y extraer los datos de la tabla
            const regex = /(\d{2}\/\d{2}\/\d{2})\s+([\w\s.]+(?:\s[\w\s.]+)*)\s+([\d.]+(?:,\d{2})?)\s+([\d.]+(?:,\d{2})?)/g; //regex para BERSA
            const regexB = this.regexBancarios.find((r) => r.valor === this.modelo);            
            const matches = Array.from(pageText.matchAll(regexB.regex));
            
            const movimientos = [];
            let saldoAnterior = 0;
            const regexSaldoInicial = /Saldo del periodo anterior\s+([\d.]+(?:,\d{2})?)/; //regex para BERSA
            const regexSaldoInicial1 = regexB.regexSaldoInicial;

            const match = regexSaldoInicial1.exec(pageText);
            

            if (match) {
              const saldo2 = parseFloat(match[1].replace('.', '').replace(',', '.'));
              saldoAnterior = saldo2;
              console.log(saldoAnterior);
            }

            
            console.log(matches)
            for (const match of matches) {
              const fecha = match[1];
              const descripcion = match[2];
              const monto1 = match[3].replace('.', '');
              let importe = parseFloat(monto1.replace(',', '.'));
              const saldo1 = match[4].replace('.', '');
              const saldo = parseFloat(saldo1.replace(',', '.'));

              if (saldoAnterior > saldo) {
                importe *= -1; // Multiplicar el importe por -1
              }
            
              saldoAnterior = saldo; // Actualizar el saldo del movimiento anterior
    
              const movimiento = {
                fecha,
                descripcion,
                importe,
                saldo
              };
    
              movimientos.push(movimiento);
             
            }
    
            resolve(movimientos);
            console.log(movimientos);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    }

  
  
  // este ejemplo es en el caso de querer implementar lectura de OCR en un futuro.
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
    
    if (this.selecCuenta) {
      const tabla = document.getElementById('movBancarios');
      const filas = tabla.getElementsByTagName('tr');
      for (let i = 1; i < filas.length; i++) {
          const celdas = filas[i].getElementsByTagName('td');
          const objetoDeFila = {
            fechaMov: celdas[0].innerHTML,
            descMov: celdas[1].innerHTML,
            referencia: celdas[2].innerHTML,
            importeMov: celdas[3].innerHTML,
            cuenta_imp: celdas[4].querySelector('select').value,
            cuenta_banco: this.selecCuenta,
            fecha_imputacion: this.fechaDeInicio,
            fecha_carga: new Date(),
            conciliado: false

          };
          this.movimientosBancarios.push(objetoDeFila);


      }

      console.log(this.movimientosBancarios);
    } else {
      alert("Debe seleccionar fecha de imputación");
    }

  }





}