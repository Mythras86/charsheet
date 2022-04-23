import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

  export interface ValasztottFaj {
  fajnev: string,
  eroMax: number,
  gyoMax: number,
  ugyMax: number,
  kitMax: number,
  akaMax: number,
  intMax: number,
  logMax: number,
  fegyMax: number,
  karMax: number,
  magMax: number,
  ktaMax: number,
  erzMax: number,
  defHeight: number,
  defWieght: number,
  defAge: number,
  defKepessegek: [{kepesseg: string}],
}

export const Fajok: Array<any> = [
  {
    fajnev: 'Ember',
    ktaMin: 3, ktaMax: 3,
    defHeight: 180, defWieght: 75, defAge: 30,
    defKepessegek: [{kepesseg: '+3 Karmatartalék'}],
  },
  {
    fajnev: 'Tünde',
    gyoMax: 1, intMax: 2,
    defHeight: 180, defWieght: 70, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Éjszakai látás'},
      {kepesseg: '1,2x jobb látás'},
      {kepesseg: '1,2x jobb hallás'},
    ],
  },
  {
    fajnev: 'Törpe',
    eroMax: 2, gyoMax: -1,
    kitMax: 1, akaMax: 1,
    defHeight: 140, defWieght: 60, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Hőlátás'},
      {kepesseg: 'Irányérzék'}
    ],
  },
  {
    fajnev: 'Ork',
    eroMax: 2, kitMax: 3,
    logMax: -1, intMax: -1,
    defHeight: 190, defWieght: 95, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Éjszakai látás'},
      {kepesseg: '1,2x jobb látás'},
      {kepesseg: '1,2x jobb hallás'},
    ],
  },
  {
    fajnev: 'Troll',
    eroMax: 4, gyoMax: -1,
    kitMax: 4, logMax: -2,
    intMax: -2,
    defHeight: 280, defWieght: 220, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Hőlátás'},
      {kepesseg: '+1 Elérés'},
      {kepesseg: '+1 Test sebesülés ellen'},
    ],
  },
];

export const Nemek: Array<any> = [
  'Férfi',
  'Nő',
  'Mindkettő',
  'Egyiksem',
  'Egyéb',
];

export const Hagyomanyok: Array<any> = [
  {text:'Inaktív', list:'inaktiv'},
  {text:'Hermetikus', list:'hermetikus'},
  {text:'Hermetikus-Idéző', list:'hermetikus'},
  {text:'Hermetikus-Igéző', list:'hermetikus'},
  {text:'Elementalista', list:'elementalista'},
  {text:'Sámán', list:'saman'},
  {text:'Sámánista', list:'saman'},
  {text:'Sámán-Idéző', list:'saman'},
  {text:'Sámán-Igéző', list:'saman'},
  {text: 'Adeptus', list:'adeptus'},
];

export const HagyomanyLista: Array<any> = [
  {list: 'inaktiv', text: 'Inaktív'},
  {list: 'hermetikus', text: 'Összes'},
  {list: 'elementalista', text: 'Tűz'},
  {list: 'elementalista', text: 'Víz'},
  {list: 'elementalista', text: 'Levegő'},
  {list: 'elementalista', text: 'Föld'},
  {list: 'saman', text: 'Aligátor'},
  {list: 'saman', text: 'Bagoly'},
  {list: 'saman', text: 'Medve'},
  {list: 'saman', text: 'Bölény'},
  {list: 'saman', text: 'Cápa'},
  {list: 'saman', text: 'Delfin'},
  {list: 'saman', text: 'Egér'},
  {list: 'saman', text: 'Farkas'},
  {list: 'saman', text: 'Holló'},
  {list: 'saman', text: 'Kígyó'},
  {list: 'saman', text: 'Kutya'},
  {list: 'saman', text: 'Macska'},
  {list: 'saman', text: 'Mosómedve'},
  {list: 'saman', text: 'Oroszlán'},
  {list: 'saman', text: 'Patkány'},
  {list: 'saman', text: 'Prérifarkas'},
  {list: 'saman', text: 'Sas'},
  {list: 'adeptus', text: 'Fizikai'},
  {list: 'adeptus', text: 'Misztikus'},
];

@Injectable ({ providedIn: "root" })
export class selectRaceService {
  private selectedrace = new BehaviorSubject('');

  getRace = this.selectedrace.asObservable();

  updateRace(yourRace: string): void {
    this.selectedrace.next(yourRace);
  }
}
