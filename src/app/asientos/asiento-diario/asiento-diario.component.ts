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
  totalDebe:any = 0
  totalHaber:any = 0
  

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

      if (i === 2) {
        nuevoInput.addEventListener('input', () => {
          this.sumatorias();
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

      if (i === 2) {
        nuevoInput.addEventListener('input', () => {
          this.sumatorias();
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

    
  sumatorias() {
    const valores = []
    const tabla = document.getElementById('asientoDiarioDebe');
    const filas = tabla.getElementsByTagName('tr');
    for (let i = 1; i < filas.length; i++) {
      const celdas = filas[i].getElementsByTagName('td');
      const input = celdas[2].querySelector('input');
      valores.push(parseFloat(input.value));
    };

    this.totalDebe = valores.reduce((a, b) => a + b, 0);

    const valores1 = []
    const tabla1 = document.getElementById('asientoDiarioHaber');
    const filas1 = tabla1.getElementsByTagName('tr');
    for (let i = 1; i < filas1.length; i++) {
      const celdas = filas1[i].getElementsByTagName('td');
      const input = celdas[2].querySelector('input');
      valores1.push(parseFloat(input.value));
    };

    this.totalHaber = valores1.reduce((a, b) => a + b, 0);
       
  }

  


  guardar(){
    if (this.fechaAsiento) {
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
            fechaImputacion: this.mesImputacion,
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
            fechaImputacion: this.mesImputacion,
            observaciones: this.observaciones,
            fecha_carga: new Date()

        };

        this.asientos.push(objetoDeFila);
      };


    }
  }

}