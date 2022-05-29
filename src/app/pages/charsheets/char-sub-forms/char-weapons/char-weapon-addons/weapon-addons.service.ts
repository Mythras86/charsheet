import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Addons } from './weapon-addons.model';

const BACKEND_URL = environment.apiUrl + "/addons/";

@Injectable({providedIn: 'root'})

export class AddonsService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  public addonslist: Addons[] = [];
  private addonsUpdated = new Subject<{ addons: Addons[]}>();

  createAddons(): FormGroup {
    const addonsForm = {
      addons: this.fb.array([]),
    };
    return this.fb.group(addonsForm);
  }

  getAddons() {
    this.http
      .get<{ message: string; addons: any}>(BACKEND_URL + "addonslist")
      .pipe(map(addonsData => {
        return {
          addons: addonsData.addons.map((addon: {
            _id: string;
            addonName: string,
            addonPlace: string,
            addonWeight: number,
            addonPrice: number,
            addonDesc: string,
            addonCategory: string,
          }) => {
            return {
              id: addon._id,
              addonName: addon.addonName,
              addonPlace: addon.addonPlace,
              addonWeight: addon.addonWeight,
              addonPrice: addon.addonPrice,
              addonDesc: addon.addonDesc,
              addonCategory: addon.addonCategory,
              };
            }),
          };
        })
      )
      .subscribe(transformedAddonsData => {
        this.addonslist = transformedAddonsData.addons;
        this.addonsUpdated.next({
        addons: [...this.addonslist],
        });
      });
  }

  getAddonsUpdateListener() {
    return this.addonsUpdated.asObservable();
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
    addonPlace: string,
    addonWeight: number,
    addonPrice: number,
    addonDesc: string,
    addonCategory: string,
) {
    const addonData: Addons = {
      id:'',
      addonName: addonName,
      addonPlace: addonPlace,
      addonWeight: addonWeight,
      addonPrice: addonPrice,
      addonDesc: addonDesc,
      addonCategory: addonCategory,
      };
    this.http.post<{ message: string; addon: Addons }>(
      BACKEND_URL + "create", addonData).subscribe(response => {
        this.router.navigate(["/equipments"]);
      });
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
    this.http
      .patch(BACKEND_URL + id, addonData)
      .subscribe(response => {
        this.router.navigate(["/equipments"]);
      });
  }

  deleteOneAddon(id: string) {
    return this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.router.navigate(["/equipments"]);
    });
  }
}
