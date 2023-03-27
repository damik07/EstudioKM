import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RubrosContablesService } from '../../servicios/serviciosContables/rubros-contables.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css']
})
export class RubroComponent implements OnInit {

  rubrosForm: FormGroup;
  codificacion: String;
  rubrosList: any [];
  
  constructor(private formBuilder: FormBuilder, private rubrosContablesService:RubrosContablesService) {
    this.rubrosForm = this.formBuilder.group({
      codigoRubro: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(2)]],
      nombreRubro: ['', Validators.required],
      nivel: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      rubroSuperior: ['']
    });

    this.rubrosList = rubrosContablesService.rubrosContables;
  }

  get CodigoRubro(){
    return this.rubrosForm.get("codigoRubro");
  };

  get NombreRubro(){
    return this.rubrosForm.get("nombreRubro");
  };

  get Nivel(){
    return this.rubrosForm.get("nivel");
  };

  get TipoCuenta(){
    return this.rubrosForm.get("tipoCuenta");
  };

  get RubroSuperior(){
    return this.rubrosForm.get("rubroSuperior");
  };

  get CodigoValid(){
    return this.CodigoRubro?.touched && !this.CodigoRubro?.valid;
  };

  get NombreValid(){
    return this.NombreRubro?.touched && !this.NombreRubro?.valid;
  };

  get NivelValid(){
    return this.Nivel?.touched && !this.Nivel?.valid;
  };

  get TipoValid(){
    return this.TipoCuenta?.touched && !this.TipoCuenta?.valid;
  };

  get SuperiorValid(){
    return this.RubroSuperior?.touched && !this.RubroSuperior?.valid;
  };

  obtenerRubroSuperiorAsociado(): string {
    const rubroActual = this.RubroSuperior; // obtener el código del rubro actual desde la variable "codigo"
    const rubroSuperior = this.rubrosList.find(rubro => rubro.nombreRubro === rubroActual); // buscar el rubro superior asociado en la lista de rubros
    return rubroSuperior.codificacion;
  }

  generarCodificacion(): void {
    if (this.Nivel.value === 1) {
      this.codificacion = `${this.CodigoRubro}.00.00.00`;
    } else if (this.Nivel.value === 2) {
      const rubroSuperior = this.obtenerRubroSuperiorAsociado(); // función para obtener el rubro superior asociado
      const cod = rubroSuperior.slice(0,1)
      this.codificacion = `${cod}.${this.CodigoRubro}.00.00`;
    } else if (this.Nivel.value === 3) {
      const rubroSuperior = this.obtenerRubroSuperiorAsociado(); // función para obtener el rubro superior asociado
      const cod = rubroSuperior.slice(0,4)
      this.codificacion = `${rubroSuperior}.${this.CodigoRubro}.00`;
    }
  }

  

  onSubmit() {
    const nuevoRubro = this.rubrosForm.value;

    //codificación del rubro
    //const agrCodRubro = nuevoRubro.map(obj =>({
    //  ...obj,
    //    codigoPlan: obj.importe
    //}));

    this.rubrosContablesService.agregarRubroContable(nuevoRubro);
    this.rubrosForm.reset();
  }

  ngOnInit() {
  }

}