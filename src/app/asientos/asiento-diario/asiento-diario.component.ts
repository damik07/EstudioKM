import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asiento-diario',
  templateUrl: './asiento-diario.component.html',
  styleUrls: ['./asiento-diario.component.css']
})
export class AsientoDiarioComponent implements OnInit {

  mesImputacion: string;
  fechaAsiento: string;
  observaciones: string;

  constructor() { }

  ngOnInit() {
  }

  agregarFila() {
    const tablaBody = document.getElementById('tablaBody');
    const nuevaFila = document.createElement('tr');

    for (let i = 0; i < 2; i++) {
      const nuevaCelda = document.createElement('td');
      const nuevoInput = document.createElement('input');
      nuevoInput.type = 'text';
      nuevoInput.id = `input${i + 1}`;
      nuevoInput.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'm') {
          const target = event.target as HTMLElement;
        this.mostrarBuscador(target);
        }
      });

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

  mostrarBuscador(inputElement: HTMLElement) {
    // Obtener el valor actual del input
    if (inputElement instanceof HTMLInputElement) {
      const valorInput = inputElement.value;

    // Crear un elemento de buscador y configurarlo según tus necesidades
    const buscador = document.createElement('div');
    // Agregar estilos, atributos y funcionalidad al buscador

    // Realizar la búsqueda y mostrar los resultados en el buscador
    const resultados = this.realizarBusqueda(valorInput);
    this.mostrarResultadosBusqueda(buscador, resultados);

    // Agregar el buscador a la página (por ejemplo, al body)
    document.body.appendChild(buscador);
    };
  }

  realizarBusqueda(valor: string): string[] {
    // Lógica para realizar la búsqueda y obtener los resultados
    // Retorna un array de resultados
    return ['Resultado 1', 'Resultado 2', 'Resultado 3'];
  }

  mostrarResultadosBusqueda(buscador: HTMLElement, resultados: string[]) {
    // Lógica para mostrar los resultados en el buscador
  }

}