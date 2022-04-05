import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-attributes',
  templateUrl: './char-attributes.component.html',
  styleUrls: ['./char-attributes.component.css']
})
export class CharAttributesComponent implements OnInit {

  @Input()
  attributesForm!: FormGroup;
  baseAttrData: Array<any>;
  legendlist: Array<any>;


  constructor() {

    this.legendlist = [
      {type: 'Fizikai'},
      {type: 'Asztrális'},
      {type: 'Egyéb'},
      {type: 'Származtatott'},
    ]

    this.baseAttrData = [
      {nev: 'Erő', fcname:'ero', type: 'Fizikai'},
      {nev: 'Gyorsaság', fcname:'gyo', type: 'Fizikai'},
      {nev: 'Ügyesség', fcname:'ugy', type: 'Fizikai'},
      {nev: 'Fizikum', fcname:'fiz', type: 'Fizikai'},
      {nev: 'Akaraterő', fcname:'aka', type: 'Asztrális'},
      {nev: 'Intuíció', fcname:'int', type: 'Asztrális'},
      {nev: 'Logika', fcname:'log', type: 'Asztrális'},
      {nev: 'Kitartás', fcname:'kit', type: 'Asztrális'},
      {nev: 'Mágia', fcname:'mag', type: 'Egyéb'},
      {nev: 'Karizma', fcname:'kar', type: 'Egyéb'},
      {nev: 'Érzékelés', fcname:'erz', type: 'Egyéb'},
      {nev: 'Karma', fcname:'kta', type: 'Egyéb'},
    ];
  }

  ngOnInit(): void { }

  increment(attrControl: string) {
    this.attributesForm.patchValue({
      [attrControl]: this.attributesForm.get(attrControl)!.value + 1,
    });
  }

  decrement(attrControl: string) {
    this.attributesForm.patchValue({
      [attrControl]: this.attributesForm.get(attrControl)!.value - 1
    });
  }

  getAttrValue(attrControl: string) {
    return this.attributesForm.get(attrControl)!.value;
  }

  getAttrFilter(legend:string) {
    return this.baseAttrData.filter(x => x.type === legend);
  }

}
