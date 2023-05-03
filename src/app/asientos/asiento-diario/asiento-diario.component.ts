import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RubrosContablesService } from '../../servicios/serviciosContables/rubros-contables.service';
import * as $ from 'jquery';





@Component({
  selector: 'app-asiento-diario',
  templateUrl: './asiento-diario.component.html',
  styleUrls: ['./asiento-diario.component.css']
})
export class AsientoDiarioComponent implements OnInit {

  mesImputacion: string;
  fechaAsiento: string;
  observaciones: string;
  rubrosList: any;

  constructor(private rubrosContablesService:RubrosContablesService) {
    this.rubrosList = rubrosContablesService.rubrosContables.filter(rubros => 
      rubros.nivel === "3"
    );
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
        const datalist = document.createElement('datalist');
        datalist.id = `datalist${i + 1}`;
        // Agrega las opciones del datalist (puedes reemplazar estas opciones con tus propios valores)
        datalist.innerHTML = `
          <option *ngFor="let list of rubrosList" [value]="list.codificacion">
          
        `;
        nuevoInput.setAttribute('list', datalist.id);
        nuevaCelda.appendChild(datalist);
      };

      if (i === 1) {
        const datalist = document.createElement('datalist');
        datalist.id = `datalist${i + 1}`;
        // Agrega las opciones del datalist (puedes reemplazar estas opciones con tus propios valores)
        datalist.innerHTML = `
          <option *ngFor="let list of rubrosList" [value]="list.nombreRubro">
          
        `;
        nuevoInput.setAttribute('list', datalist.id);
        nuevaCelda.appendChild(datalist);
      };

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

    $(document).on('input', '#tablaBody input', function() {
      const currentInput = $(this);
      const currentRow = currentInput.closest('tr');
      const otherInput = currentRow.find('input:not(#' + currentInput.attr('id') + ')');
    
      otherInput.val(currentInput.val());
    });
    
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