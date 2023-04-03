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
    
    const cuenta = cuentas.cuentasContables;
    const rubro = rubros.rubrosContables;
    const plan = rubro.concat(cuenta);

    this.planCuentasList = [];
      for(let i = 0; i < plan.length; i++){
      let obj = {};
      Object.assign(obj, plan[i], plan.find((item) => item.codificacion === plan[i].codificacion && item !== plan[i]));
      this.planCuentasList.push(obj);      
      };

    this.planCuentasList = this.planCuentasList.sort((a, b) => a.codificacion.localeCompare(b.codificacion));

    this.planCuentasList = this.planCuentasList.map(objeto => {
      let cValor = "";
      if (!objeto.nombreRubro) {
        cValor = objeto.nombreCuenta
      } else {cValor = objeto.nombreRubro}

      return {
        ...objeto,
        descripcion: cValor
      }
    });  
    console.log(this.planCuentasList);
    console.log(plan);

    

   }

  ngOnInit() {
  }

}