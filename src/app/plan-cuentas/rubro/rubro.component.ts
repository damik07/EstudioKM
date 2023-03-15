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

  constructor(private formBuilder: FormBuilder, private rubrosContablesService:RubrosContablesService) {
    this.rubrosForm = this.formBuilder.group({
      codigoRubro: ['', Validators.required, Validators.minLength(1),Validators.maxLength(2)],
      nombreRubro: ['', Validators.required],
      nivel: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      rubroSuperior: ['']
    });
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

  

  onSubmit() {
    const nuevoRubro = this.rubrosForm.value;
    this.rubrosContablesService.agregarRubroContable(nuevoRubro);
    console.log(this.rubrosContablesService.rubrosContables);
    this.rubrosForm.reset();
  }
  ngOnInit() {
  }

}