import { Component, OnInit } from '@angular/core';
import { RubrosContablesService } from '../../servicios/serviciosContables/rubros-contables.service';


@Component({
  selector: 'app-ver-rubros',
  templateUrl: './ver-rubros.component.html',
  styleUrls: ['./ver-rubros.component.css']
})
export class VerRubrosComponent implements OnInit {

  rubrosList: any;

  constructor(private rubros:RubrosContablesService) {
    this.rubrosList = rubros.rubrosContables;
   }

  ngOnInit() {
  }

}