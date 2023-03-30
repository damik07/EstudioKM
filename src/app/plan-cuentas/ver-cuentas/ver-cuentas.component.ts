import { Component, OnInit } from '@angular/core';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';

@Component({
  selector: 'app-ver-cuentas',
  templateUrl: './ver-cuentas.component.html',
  styleUrls: ['./ver-cuentas.component.css']
})
export class VerCuentasComponent implements OnInit {

  cuentasList: any;

  constructor(private cuentas:CuentasContablesService) {
    this.cuentasList = cuentas.cuentasContables;

   }

  ngOnInit() {
  }

}