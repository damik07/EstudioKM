import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
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
        nuevoInput.setAttribute('list', 'datalist');
        nuevoInput.addEventListener('input', (event) => {
          const inputElement = event.target as HTMLInputElement;
          const valorSeleccionado = inputElement.value;
          const cuenta = this.cuentas.find((cuenta) => cuenta.codificacion === valorSeleccionado);
          const codigo = this.cuentas.find((cuenta) => cuenta.nombreCuenta === valorSeleccionado);
          if (cuenta) {
            const inputs = nuevaFila.querySelectorAll('input');
            inputs.forEach((input) => {
              if (input !== event.target) {
                input.value = cuenta.nombreCuenta;
              }
            });
          } else if (codigo) {
            const inputs = nuevaFila.querySelectorAll('input');
            inputs.forEach((input) => {
              if (input !== event.target) {
                input.value = cuenta.codificacion;
              }
            });
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

    //$(document).on('input', '#tablaBody input', function() {
      //const currentInput = $(this);
      //const currentRow = currentInput.closest('tr');
      //const otherInput = currentRow.find('input:not(#' + currentInput.attr('id') + ')');
    
      //otherInput.val(currentInput.val());
    //});
    
  }

  

  agregarFila1() {
    const tablaBody = document.getElementById('tablaBody1');
    const nuevaFila = document.createElement('tr');

    for (let i = 0; i < 3; i++) {
      const nuevaCelda = document.createElement('td');
      const nuevoInput = document.createElement('input');
      nuevoInput.type = 'text';
      nuevoInput.id = `input${i + 1}`;
      

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

  

}