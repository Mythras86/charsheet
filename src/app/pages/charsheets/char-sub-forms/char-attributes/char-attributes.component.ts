import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fajok, selectRaceService } from '../char-races';
import { CharSubServices } from '../services-for-subforms';

@Component({
  selector: 'app-char-attributes',
  templateUrl: './char-attributes.component.html',
  styleUrls: ['./char-attributes.component.css']
})
export class CharAttributesComponent implements OnInit, OnDestroy {

  @Input() attributesForm!: FormGroup;
  public yourRace!: string;

  constructor(
    private selectraceservice: selectRaceService,
    public charSubs: CharSubServices,
  ) { }

  attributes: Array<any> = [
    //fizikai
    {nev: 'Erő', fcname:'karFizEro', csoport: 'Fizikum', eromin: 1},
    {nev: 'Gyorsaság', fcname:'karFizGyo', csoport: 'Fizikum', gyomin: 1},
    {nev: 'Ügyesség', fcname:'karFizUgy', csoport: 'Fizikum', ugymin: 1},
    {nev: 'Kitartás', fcname:'karFizAll', csoport: 'Fizikum', kitmin: 1},
    //szellemi
    {nev: 'Akaraterő', fcname:'karAsztEro', csoport: 'Asztrális', akamin: 1},
    {nev: 'Intuíció', fcname:'karAsztGyo', csoport: 'Asztrális', intmin: 1},
    {nev: 'Logika', fcname:'karAsztUgy', csoport: 'Asztrális', logmin: 1},
    {nev: 'Fegyelem', fcname:'karAsztAll', csoport: 'Asztrális', fegymin: 1},
    //speciális
    {nev: 'Mágia', fcname:'karMagia', csoport: 'Speciális', magmin: 0},
    {nev: 'Kockatartalék', fcname:'karKockatartalek', csoport: 'Speciális', ktamin: 0},
    {nev: 'Esszencia', fcname:'karEsszencia', csoport: 'Speciális', essmin: 6, buttonstatus: "disabled"},
    {nev: 'Kezdeményezés', fcname:'karKezdemenyezes', csoport: 'Speciális', kezdmin: 0, buttonstatus: "disabled"},
  ];

    getAttributes() {
    return this.attributes;
  }

  getMinValue(attrInput: string) {
    const attrBase:any = this.attributes.filter(x => x.fcname == attrInput).map(x => x[attrInput + "min"]);
    const minvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[attrInput + "Min"]);
    return minvalue*1 + attrBase*1;
  }

  getMaxValue(attrInput: string) {
    const maxvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[attrInput + "Max"]);
    return maxvalue*1+6;
  }

  getTotalValue(attrInput: string) {
    return this.getMinValue(attrInput) + this.charSubs.getFromContValue(attrInput, this.attributesForm);
  }

  ngOnInit(): void {
    this.selectraceservice.getRace.subscribe(yourRace => this.yourRace = yourRace);
  }

  ngOnDestroy(): void { }
}
