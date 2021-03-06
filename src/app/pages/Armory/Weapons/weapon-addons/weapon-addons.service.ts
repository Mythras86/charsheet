import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WeaponAddons, WeaponAddonsDataInterface } from './weapon-addons.model';

const BACKEND_URL = environment.apiUrl + "/weaponaddons/";

@Injectable({providedIn: 'root'})

export class WeaponAddonsService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.weaponAddonsList = null;
   }

  public weaponAddonsList: WeaponAddons[] = [];

  createAddons(): FormGroup {
    const addonsForm = {
      addons: this.fb.array([]),
    };
    return this.fb.group(addonsForm);
  }

  private processAddonData(addonsData: WeaponAddonsDataInterface) {
    return addonsData.addons.map((w) => {
      return {
        id: (w as any)._id,
        addonName: w.addonName,
        addonCategory: w.addonCategory,
        addonPlace: w.addonPlace,
        addonAddWeight: w.addonAddWeight,
        addonAddPrice: w.addonAddPrice,
        addonMultiWeight: w.addonMultiWeight,
        addonMultiPrice: w.addonMultiPrice,
        addonDesc: w.addonDesc,
      } as WeaponAddons
    });
  }

  private setAddonsList (weaponAddonsList: WeaponAddons[]) {
    this.weaponAddonsList = weaponAddonsList;
  }

  getAddons(): Observable<WeaponAddons[]> {
    if (this.weaponAddonsList !== null) {
      return of(this.weaponAddonsList)
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
      addonCategory: string,
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
    addonCategory: string,
    addonPlace: string,
    addonAddWeight: number,
    addonAddPrice: number,
    addonMultiWeight: number,
    addonMultiPrice: number,
  addonDesc: string,
) {
    const addonData: WeaponAddons = {
      id:'',
      addonName: addonName,
      addonCategory: addonCategory,
      addonPlace: addonPlace,
      addonAddWeight: addonAddWeight,
      addonAddPrice: addonAddPrice,
      addonMultiWeight: addonMultiWeight,
      addonMultiPrice: addonMultiPrice,
      addonDesc: addonDesc,
    };
    this.http.post<{ message: string; addon: WeaponAddons }>(
      BACKEND_URL + "create", addonData).subscribe(response => {
        this.router.navigate(["/weaponaddonslist"]);
      });
      this.weaponAddonsList= null;
      this.getAddons();
  }

  updateOneAddon(
    id: string,
    addonName: string,
    addonCategory: string,
    addonPlace: string,
    addonAddWeight: number,
    addonAddPrice: number,
    addonMultiWeight: number,
    addonMultiPrice: number,
    addonDesc: string,
  ) {
    let addonData: WeaponAddons;
    addonData = {
      id: id,
      addonName: addonName,
      addonCategory: addonCategory,
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
      this.router.navigate(["/weaponaddonslist"]);
    });
    this.weaponAddonsList= null;
    this.getAddons();
  }

  deleteOneAddon(id: string) {
    this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.weaponAddonsList= null;
    });
    this.getAddons();
    this.router.navigate(["/weaponaddonslist"]);
  }
}
