import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArmorAddons, ArmorAddonsDataInterface } from './armor-addons.model';

const BACKEND_URL = environment.apiUrl + "/armoraddons/";

@Injectable({providedIn: 'root'})

export class ArmorAddonsService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.armorAddonsList = null;
   }

  public armorAddonsList: ArmorAddons[] = [];

  createAddons(): FormGroup {
    const armorAddonsForm = {
      addons: this.fb.array([]),
    };
    return this.fb.group(armorAddonsForm);
  }

  private processAddonData(addonsData: ArmorAddonsDataInterface) {
    return addonsData.addons.map((w) => {
      return {
        id: (w as any)._id,
        addonName: w.addonName,
        addonPlace: w.addonPlace,
        addonAddWeight: w.addonAddWeight,
        addonAddPrice: w.addonAddPrice,
        addonMultiWeight: w.addonMultiWeight,
        addonMultiPrice: w.addonMultiPrice,
        addonDesc: w.addonDesc,
      } as ArmorAddons
    });
  }

  private setAddonsList (armorAddonsList: ArmorAddons[]) {
    this.armorAddonsList = armorAddonsList;
  }

  getAddons(): Observable<ArmorAddons[]> {
    if (this.armorAddonsList !== null) {
      return of(this.armorAddonsList)
    }
    return this.http
      .get<{ message: string; addons: any}>(BACKEND_URL + "list")
      .pipe(
        map(this.processAddonData),
        tap(this.setAddonsList.bind(this))
      )
  }

  getOneAddon(id: string) {
    return this.http.get<{
      _id: string;
      addonName: string,
      addonPlace: string,
      addonAddWeight: number,
      addonAddPrice: number,
      addonMultiWeight: number,
      addonMultiPrice: number,
      addonDesc: string,
}>(BACKEND_URL + id);
  }

  addOneAddon(
    addonName: string,
    addonPlace: string,
    addonAddWeight: number,
    addonAddPrice: number,
    addonMultiWeight: number,
    addonMultiPrice: number,
  addonDesc: string,
) {
    const addonData: ArmorAddons = {
      id:'',
      addonName: addonName,
      addonPlace: addonPlace,
      addonAddWeight: addonAddWeight,
      addonAddPrice: addonAddPrice,
      addonMultiWeight: addonMultiWeight,
      addonMultiPrice: addonMultiPrice,
      addonDesc: addonDesc,
    };
    this.http.post<{ message: string; addon: ArmorAddons }>(
      BACKEND_URL + "create", addonData).subscribe(response => {
        this.router.navigate(["/armoraddonslist"]);
      });
      this.armorAddonsList= null;
      this.getAddons();
  }

  updateOneAddon(
    id: string,
    addonName: string,
    addonPlace: string,
    addonAddWeight: number,
    addonAddPrice: number,
    addonMultiWeight: number,
    addonMultiPrice: number,
    addonDesc: string,
  ) {
    let addonData: ArmorAddons;
    addonData = {
      id: id,
      addonName: addonName,
      addonPlace: addonPlace,
      addonAddWeight: addonAddWeight,
      addonAddPrice: addonAddPrice,
      addonMultiWeight: addonMultiWeight,
      addonMultiPrice: addonMultiPrice,
      addonDesc: addonDesc,
    };
    this.http
    .patch(BACKEND_URL + id, addonData)
    .subscribe(response => {
      this.router.navigate(["/armoraddonslist"]);
    });
    this.armorAddonsList= null;
    this.getAddons();
  }

  deleteOneAddon(id: string) {
    this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.armorAddonsList= null;
    });
    this.getAddons();
    this.router.navigate(["/armoraddonslist"]);
  }
}
