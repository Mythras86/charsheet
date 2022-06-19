import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Addons, AddonsDataInterface } from './weapon-addons.model';

const BACKEND_URL = environment.apiUrl + "/addons/";

@Injectable({providedIn: 'root'})

export class AddonsService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.addonsList = null;
   }

  public addonsList: Addons[] = [];

  createAddons(): FormGroup {
    const addonsForm = {
      addons: this.fb.array([]),
    };
    return this.fb.group(addonsForm);
  }

  private processAddonData(addonsData: AddonsDataInterface) {
    return addonsData.addons.map((w) => {
      return {
        id: (w as any)._id,
        addonName: w.addonName,
        addonCategory: w.addonCategory,
        addonPlace: w.addonPlace,
        addonWeight: w.addonWeight,
        addonPrice: w.addonPrice,
        addonDesc: w.addonDesc,
      } as Addons
    });
  }

  private setAddonsList (addonsList: Addons[]) {
    this.addonsList = addonsList;
  }

  getAddons(): Observable<Addons[]> {
    if (this.addonsList !== null) {
      return of(this.addonsList)
    }
    return this.http
      .get<{ message: string; addons: any}>(BACKEND_URL + "addonslist")
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
      addonWeight: number,
      addonPrice: number,
      addonDesc: string,
      addonCategory: string,
}>(BACKEND_URL + id);
  }

  addOneAddon(
    addonName: string,
    addonCategory: string,
    addonPlace: string,
    addonWeight: number,
    addonPrice: number,
    addonDesc: string,
) {
    const addonData: Addons = {
      id:'',
      addonName: addonName,
      addonCategory: addonCategory,
      addonPlace: addonPlace,
      addonWeight: addonWeight,
      addonPrice: addonPrice,
      addonDesc: addonDesc,
    };
    this.http.post<{ message: string; addon: Addons }>(
      BACKEND_URL + "create", addonData).subscribe(response => {
      this.router.navigate(["/weaponaddonslist"]);
    });
    this.addonsList= null;
    this.getAddons();
  }

  updateOneAddon(
    id: string,
    addonName: string,
    addonPlace: string,
    addonWeight: number,
    addonPrice: number,
    addonDesc: string,
    addonCategory: string,
  ) {
    let addonData: Addons;
    addonData = {
      id: id,
      addonName: addonName,
      addonPlace: addonPlace,
      addonWeight: addonWeight,
      addonPrice: addonPrice,
      addonDesc: addonDesc,
      addonCategory: addonCategory,
    };
    this.getAddons();
    this.http
      .patch(BACKEND_URL + id, addonData)
      .subscribe(response => {
        this.router.navigate(["/weaponaddonslist"]);
      });
  }

  deleteOneAddon(id: string) {
    return this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.router.navigate(["/weaponaddonslist"]);
    });
  }
}
