import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

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
  {nem: 'Férfi'},
  {nem: 'Nő'},
  {nem: 'Mindkettő'},
  {nem: 'Egyiksem'},
  {nem: 'Egyéb'},
];

@Injectable ({ providedIn: "root" })
export class selectRaceService {
  private selectedrace = new BehaviorSubject('');

  getRace = this.selectedrace.asObservable();

  updateRace(yourRace: string): void {
    this.selectedrace.next(yourRace);
  }
}
