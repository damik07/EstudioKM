import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class RubrosContablesService {
  
  rubrosContables?:any=[
    
  ];

  agregarRubroContable(nuevoRubro) {
    this.rubrosContables.push(nuevoRubro);
  };

}