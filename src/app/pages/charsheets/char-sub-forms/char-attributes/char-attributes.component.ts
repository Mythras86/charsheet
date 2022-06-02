import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fajok, selectRaceService } from '../char-utility';
import { ResourcesService } from '../char-resources/resources.service';
import { CharSubServices } from '../services-for-subforms';
import { attributes } from './attributes.model';

@Component({
  selector: 'app-char-attributes',
  templateUrl: './char-attributes.component.html',
  styleUrls: ['./char-attributes.component.css']
})
export class CharAttributesComponent implements OnInit, OnDestroy {

  @Input() attributesForm!: FormGroup;

  constructor(
    private selectraceservice: selectRaceService,
    public charSubs: CharSubServices,
    public resServ: ResourcesService
    ) { }

  public yourRace!: string;
  public nopoints:boolean = false;
  public yourAttrs:number = 0;

  getAttributes() {
    return attributes;
  }

  getMinValue(fcname: string): number {
    const attrBase:any = attributes.filter(x => x.fcname == fcname).map(x => x[fcname + "min"]);
    const minvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[fcname + "Min"]);
    return minvalue*1 + attrBase*1;
  }

  getMaxValue(fcname: string): number {
    const maxvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[fcname + "Max"]);
    return maxvalue*1+6;
  }

  getTotalValue(attrInput: string): number {
    return this.getMinValue(attrInput) + this.charSubs.getFromContValue(attrInput, this.attributesForm);
  }

  getSum():number {
    const attrObj: Object = this.attributesForm.value;
    const attrArray = Object.values(attrObj);
    const sumAttr: number = attrArray.reduce((prev, next ) => prev + next, 0);
     if (this.yourAttrs-sumAttr <= 0) {
       this.nopoints = true;
       return this.yourAttrs-sumAttr;
     } else {
       this.nopoints = false;
       return this.yourAttrs-sumAttr;
     }
  }

  ngOnInit(): void {
    this.selectraceservice.getRace.subscribe(yourRace => this.yourRace = yourRace);
    this.resServ.getAttrPoints.subscribe(yourAttrs => this.yourAttrs = yourAttrs);
  }

  ngOnDestroy(): void { }

}
