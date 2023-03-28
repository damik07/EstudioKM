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
  rubrosList: any;
  
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

  obtenerRubroSuperiorAsociado(): any {
    const rubroActual = this.RubroSuperior; 
    const rubroSuperior = this.rubrosList.find(rubro => rubro.nombreRubro === rubroActual.value);
         
    return rubroSuperior.codificacion;
    
  }

  generarCodificacion(): void {
    if (this.Nivel.value === "1") {
      this.codificacion = `${this.CodigoRubro.value}.00.00.00`;
    } else if (this.Nivel.value === "2") {
      const rubroSuperior = this.obtenerRubroSuperiorAsociado(); // función para obtener el rubro superior asociado
      const cod = rubroSuperior.slice(0,1)
      this.codificacion = `${cod}.${this.CodigoRubro.value}.00.00`;      
    } else if (this.Nivel.value === "3") {
      const rubroSuperior1 = this.obtenerRubroSuperiorAsociado(); // función para obtener el rubro superior asociado
      const cod1 = rubroSuperior1.slice(0,4)
      this.codificacion = `${cod1}.${this.CodigoRubro.value}.00`;
    }
       
    
  }

  

  onSubmit() {
    this.obtenerRubroSuperiorAsociado();
    this.generarCodificacion();
    
    //codificación del rubro
    const form = this.rubrosForm.value;
    const codificacion = this.codificacion;
    const objetoFinal = {...form, codificacion}
    this.rubrosContablesService.agregarRubroContable(objetoFinal);
   
    
    this.rubrosForm.reset();
  }

  ngOnInit() {
    
  }

}