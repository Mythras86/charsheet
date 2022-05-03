import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fajok, selectRaceService } from '../char-races';
import { CharSubServices } from '../services-for-subforms';
import { attributes } from './attributes.model';

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

    getAttributes() {
    return attributes;
  }

  getMinValue(fcname: string): number {
    const attrBase:any = attributes.filter(x => x.fcname == fcname).map(x => x[fcname + "min"]);
    const minvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[fcname + "Min"]);
    return minvalue*1 + attrBase*1;
  }

  getMaxValue(fcname: string) {
    const maxvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[fcname + "Max"]);
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
