import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharSubServices } from '../services-for-subforms';
import { resources  } from './model-for-resources';

@Component({
  selector: 'app-char-resources',
  templateUrl: './char-resources.component.html',
  styleUrls: ['./char-resources.component.css']
})
export class CharResourcesComponent implements OnInit {

  @Input() resourcesForm!: FormGroup;

  constructor(
    public charSubs: CharSubServices,
  ) {}

  ngOnInit(): void {
  }

  getRemainingKarma(): number {
    const basekarma = this.resourcesForm.get('basekarma')?.value;
    const gainedkarma = this.resourcesForm.get('gainedkarma')?.value;
    const karmaonattr = this.resourcesForm.get('karmaonattr')?.value;
    const karmaonskills = this.resourcesForm.get('karmaonskills')?.value;
    const karmaonmoney = this.resourcesForm.get('karmaonmoney')?.value;
    const karmaonmagic = this.resourcesForm.get('karmaonmagic')?.value;

    return basekarma+gainedkarma-3*karmaonattr-2*karmaonskills-karmaonmoney-karmaonmagic;
  }

  getRemainingMagic() {

  }

  getRemainingCash() {

  }

  getMinKarma(fcname: string):number {
    const minkarma:any = resources.filter(x=>x.fcname == fcname).map(x=>x.minKarma);
    return minkarma;
  }

  getPontKat() {
    return
  }

  getResources() {
    return resources;
  }

  getTotalValue(fcname: string):any {
    return this.charSubs.getFromContValue(fcname, this.resourcesForm);
  }

}
