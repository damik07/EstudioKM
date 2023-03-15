import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css']
})
export class RubroComponent implements OnInit {
  rubrosForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.rubrosForm = this.formBuilder.group({
      codigoRubro: ['', Validators.required],
      nombreRubro: ['', Validators.required],
      nivel: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      rubroSuperior: ['']
    });
  }

  onSubmit() {
    console.log(this.rubrosForm.value);
  }
  ngOnInit() {
  }

}