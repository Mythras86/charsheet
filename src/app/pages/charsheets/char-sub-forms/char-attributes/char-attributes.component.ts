import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Fajok } from '../char-utility';
import { ResourcesService } from '../char-resources/resources.service';
import { attributes } from './attributes.model';
import { AttributesService } from './attributes.service';
import { DetailsService } from '../char-details/details.service';

@Component({
  selector: 'app-char-attributes',
  templateUrl: './char-attributes.component.html',
  styleUrls: ['./char-attributes.component.css']
})
export class CharAttributesComponent implements OnInit, OnDestroy, AfterContentChecked {

  @Input() attributesForm!: FormGroup;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public detailsServ: DetailsService,
    public resServ: ResourcesService,
    public attrServ: AttributesService
    ) { }

  public yourRace: string = '';
  public yourAttrs: number = 0
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }

  getFormcontrol(fcname: string):any {
    let fc = this.attributesForm.get(fcname);
    return fc;
  }

  getLegends():Array<any> {
    const legends = [...new Set(attributes.map(x=> x.csoport))];
    return legends;
  }

  getGroups(filtername:string):Array<any> {
    const groups = attributes.filter(x=> x.csoport == filtername);
    return groups;
  }

  getMinValue(fcname: string): number {
    const attrBase:any = attributes.filter(x => x.fcname == fcname).map(x => x[fcname + "min"]);
    const minvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[fcname + "Min"]);
    return minvalue*1 + attrBase*1;
  }

  getMaxValue(fcname: string): number {
    const maxvalue:any = Fajok.filter(x => x.fajnev == this.yourRace).map(x => x[fcname + "Max"]);
    if (fcname == 'karMagia') {
      return this.attrServ.karEsszencia
    }
    return maxvalue*1+6;
  }

  getTotalValue(attrInput: string): number {
    const totalvalue = this.getMinValue(attrInput) + this.getFormcontrol(attrInput).value;
    this.attrServ[attrInput] = totalvalue;
    return totalvalue;
  }

  getSumSub(legend: string): number {
    const karFizEro = this.attributesForm.get('karFizEro').value;
    const karFizGyo = this.attributesForm.get('karFizGyo').value;
    const karFizUgy = this.attributesForm.get('karFizUgy').value;
    const karFizAll = this.attributesForm.get('karFizAll').value;
    const karAsztEro = this.attributesForm.get('karAsztEro').value;
    const karAsztGyo = this.attributesForm.get('karAsztGyo').value;
    const karAsztUgy = this.attributesForm.get('karAsztUgy').value;
    const karAsztAll = this.attributesForm.get('karAsztAll').value;
    const karMagia = this.attributesForm.get('karMagia').value;
    const karErzekeles = this.attributesForm.get('karErzekeles').value;
    const karKockatartalek = this.attributesForm.get('karKockatartalek').value;
    if (legend == 'Fizikum') {
      const fullfiz = karFizAll + karFizEro + karFizGyo + karFizUgy+4;
      this.attrServ.karFullFiz = fullfiz;
      return fullfiz;
    }
    if (legend == 'Asztrál') {
      const fullaszt = karAsztAll + karAsztEro + karAsztGyo + karAsztUgy+4;
      this.attrServ.karFullAszt = fullaszt;
      return fullaszt;
    }
    const fullspec = karMagia + karErzekeles + karKockatartalek
    return fullspec;
  }

  getSum():number {
    const attrObj: Object = this.attributesForm.value;
    const attrArray = Object.values(attrObj);
    const sumAttr: number = attrArray.reduce((prev, next ) => prev + next, 0);
    this.resServ.getPointsSpent('spentOnAttrs', sumAttr);
    return sumAttr;
  }

  noPointsForAttrs():boolean {
    if(this.getSum() == this.yourAttrs) {
      return true
    }
    return false
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.detailsServ.getRace.subscribe(yourRace => this.yourRace = yourRace);
    this.resServ.getAttrPoints.subscribe(yourAttrs => this.yourAttrs = yourAttrs);
  }

  ngOnDestroy(): void { }

}
