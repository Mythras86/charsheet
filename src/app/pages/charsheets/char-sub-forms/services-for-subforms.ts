import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class CharSubServices {

  increment(controlName: string, formname: FormGroup) {
    formname.patchValue({
      [controlName]: formname.get(controlName)!.value*1 + 1,
    });
  }

  decrement(controlName: string, formname: FormGroup) {
    formname.patchValue({
      [controlName]: formname.get(controlName)!.value*1 - 1,
    });
  }

  getFromContValue(fcname: string, formname: FormGroup) {
    return formname.get(fcname)?.value;
  }

  getLegends(legendnames: Array<any>, csoport:string) {
    const legends = [...new Set(legendnames.map(element => element[csoport]))];
    return legends;
  }

  getGroups(arrayOfItems:Array<any> ,csoport: string) {
    return arrayOfItems.filter(x=>x.csoport == csoport);
  }

}
