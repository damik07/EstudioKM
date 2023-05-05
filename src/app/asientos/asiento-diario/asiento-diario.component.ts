import { Component, OnInit } from '@angular/core';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';


@Component({
  selector: 'app-asiento-diario',
  templateUrl: './asiento-diario.component.html',
  styleUrls: ['./asiento-diario.component.css']
})
export class AsientoDiarioComponent implements OnInit {

  mesImputacion: string;
  fechaAsiento: string;
  observaciones: string;
  cuentasCodList: any;
  cuentasNombreList: any;
  cuentas:any;
  asientos:any;
  

  constructor(private cuentasContablesService:CuentasContablesService) {
    this.cuentasCodList = cuentasContablesService.cuentasContables.map(obj => obj['codificacion']);
    this.cuentasNombreList = cuentasContablesService.cuentasContables.map(obj => obj['nombreCuenta']);
    this.cuentas = cuentasContablesService.cuentasContables;
    
   }

  ngOnInit() {
  }

  
  agregarFila() {
    const tablaBody = document.getElementById('tablaBody');
    const nuevaFila = document.createElement('tr');

    for (let i = 0; i < 3; i++) {
      const nuevaCelda = document.createElement('td');
      const nuevoInput = document.createElement('input');
      nuevoInput.type = 'text';
      nuevoInput.id = `input${i + 1}`;

      if (i === 0) {
        nuevoInput.setAttribute('list', 'datalist');
      } else if (i === 1) {
        nuevoInput.setAttribute('list', 'datalist1');
      }


      if (i === 0 || i === 1) {
        nuevoInput.addEventListener('input', (event) => {
          const inputElement = event.target as HTMLInputElement;
          const valorSeleccionado = inputElement.value;
    
          if (i === 0) {
            const cuenta = this.cuentas.find((cuenta) => cuenta.codificacion === valorSeleccionado);
            if (cuenta) {
              const inputSiguiente = nuevaFila.querySelector(`#input${i + 2}`) as HTMLInputElement;
              inputSiguiente.value = cuenta.nombreCuenta;
            }
          } else if (i === 1) {
            const cuenta = this.cuentas.find((cuenta) => cuenta.nombreCuenta === valorSeleccionado);
            if (cuenta) {
              const inputAnterior = nuevaFila.querySelector(`#input${i}`) as HTMLInputElement;
              inputAnterior.value = cuenta.codificacion;
            }
          }
        });
      }

      
      

      nuevaCelda.appendChild(nuevoInput);
      nuevaFila.appendChild(nuevaCelda);
    }

    const celdaBoton = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
      nuevaFila.remove();
    });

    celdaBoton.appendChild(botonEliminar);
    nuevaFila.appendChild(celdaBoton);

    tablaBody.appendChild(nuevaFila);

    
    
  }

  

  agregarFila1() {
    const tablaBody = document.getElementById('tablaBody1');
    const nuevaFila = document.createElement('tr');

    for (let i = 0; i < 3; i++) {
      const nuevaCelda = document.createElement('td');
      const nuevoInput = document.createElement('input');
      nuevoInput.type = 'text';
      nuevoInput.id = `input${i + 1}`;

      if (i === 0) {
        nuevoInput.setAttribute('list', 'datalist');
      } else if (i === 1) {
        nuevoInput.setAttribute('list', 'datalist1');
      }


      if (i === 0 || i === 1) {
        nuevoInput.addEventListener('input', (event) => {
          const inputElement = event.target as HTMLInputElement;
          const valorSeleccionado = inputElement.value;
    
          if (i === 0) {
            const cuenta = this.cuentas.find((cuenta) => cuenta.codificacion === valorSeleccionado);
            if (cuenta) {
              const inputSiguiente = nuevaFila.querySelector(`#input${i + 2}`) as HTMLInputElement;
              inputSiguiente.value = cuenta.nombreCuenta;
            }
          } else if (i === 1) {
            const cuenta = this.cuentas.find((cuenta) => cuenta.nombreCuenta === valorSeleccionado);
            if (cuenta) {
              const inputAnterior = nuevaFila.querySelector(`#input${i}`) as HTMLInputElement;
              inputAnterior.value = cuenta.codificacion;
            }
          }
        });
      }

      
      nuevaCelda.appendChild(nuevoInput);
      nuevaFila.appendChild(nuevaCelda);
    }


    const celdaBoton = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
      nuevaFila.remove();
    });

    celdaBoton.appendChild(botonEliminar);
    nuevaFila.appendChild(celdaBoton);

    tablaBody.appendChild(nuevaFila);
  }

  guardar(){
    if (this.fechaAsiento) {
      const tabla = document.getElementById('importFactCompras');
      const filas = tabla.getElementsByTagName('tr');
      for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const objetoDeFila = {
            fecha_factura: celdas[0].innerHTML,
            documento: celdas[1].innerHTML,
            fecha_carga: new Date()

          };
          
          this.asientos.push(objetoDeFila);
      }
    }
  }

}