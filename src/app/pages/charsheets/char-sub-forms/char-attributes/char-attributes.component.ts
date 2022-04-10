import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Fajok, selectRaceService } from '../char-races';

@Component({
  selector: 'app-char-attributes',
  templateUrl: './char-attributes.component.html',
  styleUrls: ['./char-attributes.component.css']
})
export class CharAttributesComponent implements OnInit, OnDestroy {

  @Input() attributesForm!: FormGroup;
  baseAttrData: Array<any>;
  legendlist: Array<any>;
  public yourRace!: string;

  constructor(
    private selectraceservice: selectRaceService
  ) {

    this.legendlist = [
      {type: 'Fizikum'},
      {type: 'Asztrális'},
      {type: 'Speciális'},
    ]

    this.baseAttrData = [
      //fizikai
      {nev: 'Erő', fcname:'ero', type: 'Fizikum', eromin: 1},
      {nev: 'Gyorsaság', fcname:'gyo', type: 'Fizikum', gyomin: 1},
      {nev: 'Ügyesség', fcname:'ugy', type: 'Fizikum', ugymin: 1},
      {nev: 'Kitartás', fcname:'kit', type: 'Fizikum', kitmin: 1},
      //szellemi
      {nev: 'Akaraterő', fcname:'aka', type: 'Asztrális', akamin: 1},
      {nev: 'Intuíció', fcname:'int', type: 'Asztrális', intmin: 1},
      {nev: 'Logika', fcname:'log', type: 'Asztrális', logmin: 1},
      {nev: 'Fegyelem', fcname:'fegy', type: 'Asztrális', fegymin: 1},
      //speciális
      {nev: 'Mágia', fcname:'mag', type: 'Speciális', magmin: 0},
      {nev: 'Kockatartalék', fcname:'kta', type: 'Speciális', ktamin: 0},
      {nev: 'Esszencia', fcname:'ess', type: 'Speciális', essmin: 6, buttonstatus: "disabled"},
      {nev: 'Kezdeményezés', fcname:'kezd', type: 'Speciális', kezdmin: 0, buttonstatus: "disabled"},
    ];
  }

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

  getAttrValue(attrInput: string) {
    return this.attributesForm.get(attrInput)!.value;
  }

  getAttrFilter(legend:string) {
    return this.baseAttrData.filter(x => x.type === legend);
  }

  getMinValue(attrInput: string) {
    const attrBase:any = this.baseAttrData.filter(x => x.fcname == attrInput).map(x => x[attrInput + "min"]);
    const minvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[attrInput + "Min"]);
    return minvalue*1 + attrBase*1;
  }

  getMaxValue(attrInput: string) {
    const maxvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[attrInput + "Max"]);
    return maxvalue*1+6;
  }

  getTotalValue(attrInput: string) {
    return this.getMinValue(attrInput) + this.getAttrValue(attrInput)
  }

  ngOnInit(): void {
    this.selectraceservice.getRace.subscribe(yourRace => this.yourRace = yourRace);
  }

  ngOnDestroy(): void { }
}
