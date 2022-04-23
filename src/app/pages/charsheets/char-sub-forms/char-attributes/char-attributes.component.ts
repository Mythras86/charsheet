import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fajok, selectRaceService } from '../char-races';
import { CharSubServices } from '../services-for-subforms';
import { Attributes } from './model-for-attributes';

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
    public charSubs: CharSubServices
  ) { }

  getAttributes() {
    return Attributes;
  }

  getMinValue(attrInput: string) {
    const attrBase:any = Attributes.filter(x => x.fcname == attrInput).map(x => x[attrInput + "min"]);
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
