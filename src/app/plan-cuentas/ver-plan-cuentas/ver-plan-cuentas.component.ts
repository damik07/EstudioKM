import { Component, OnInit } from '@angular/core';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import { RubrosContablesService } from '../../servicios/serviciosContables/rubros-contables.service';

@Component({
  selector: 'app-ver-plan-cuentas',
  templateUrl: './ver-plan-cuentas.component.html',
  styleUrls: ['./ver-plan-cuentas.component.css']
})
export class VerPlanCuentasComponent implements OnInit {

  planCuentasList:any;

  constructor(private rubros:RubrosContablesService, private cuentas:CuentasContablesService) {
    
    this.planCuentasList = rubros.rubrosContables;

   }

  ngOnInit() {
  }

}