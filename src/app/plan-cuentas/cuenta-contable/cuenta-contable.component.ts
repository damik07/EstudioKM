import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasContablesService } from '../../servicios/serviciosContables/cuentas-contables.service';
import { RubrosContablesService } from '../../servicios/serviciosContables/rubros-contables.service';


@Component({
  selector: 'app-cuenta-contable',
  templateUrl: './cuenta-contable.component.html',
  styleUrls: ['./cuenta-contable.component.css']
})
export class CuentaContableComponent implements OnInit {

  cuentasContForm: FormGroup;
  rubrosList: any;
  codificacion:any;

  constructor(private formBuilder: FormBuilder, private rubrosContablesService:RubrosContablesService, private cuentaContableService:CuentasContablesService) { 
    this.cuentasContForm = this.formBuilder.group({
      codigoCuenta: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      nombreCuenta: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      rubroAsociado: ['', Validators.required]
    });

    this.rubrosList = rubrosContablesService.rubrosContables.filter(rubros => 
      rubros.nivel === "3"
    );
    
  };

  get CodigoCuenta(){
    return this.cuentasContForm.get("codigoCuenta");
  };

  get NombreCuenta(){
    return this.cuentasContForm.get("nombreCuenta");
  };

  get TipoCuenta(){
    return this.cuentasContForm.get("tipoCuenta");
  };

  get RubroAsociado(){
    return this.cuentasContForm.get("rubroAsociado");
  };



  get CodigoValid(){
    return this.CodigoCuenta?.touched && !this.CodigoCuenta?.valid;
  };

  get NombreValid(){
    return this.NombreCuenta?.touched && !this.NombreCuenta?.valid;
  };

  get TipoValid(){
    return this.TipoCuenta?.touched && !this.TipoCuenta?.valid;
  };

  get SuperiorValid(){
    return this.RubroAsociado?.touched && !this.RubroAsociado?.valid;
  };


  obtenerRubroAsociado(): any {
    const rubroActual = this.RubroAsociado; 
    const rubroAsociado = this.rubrosList.find(rubro => rubro.nombreRubro === rubroActual.value);
         
    return rubroAsociado.codificacion;
    
  }

  generarCodificacion(): void {
    const rubroAsoc1 = this.obtenerRubroAsociado(); // función para obtener el rubro superior asociado
    const cod1 = rubroAsoc1.slice(0,7)
    this.codificacion = `${cod1}.${this.CodigoCuenta.value}`;
           
    
  }


  onSubmit() {

    this.obtenerRubroAsociado();
    this.generarCodificacion();
    
    //codificación del rubro
    const form = this.cuentasContForm.value;
    const codificacion = this.codificacion;
    const objetoFinal = {...form, codificacion}
    this.cuentaContableService.agregarCuentaContable(objetoFinal);
    console.log(objetoFinal);
    this.cuentasContForm.reset();

  }


  ngOnInit() {

  }

}