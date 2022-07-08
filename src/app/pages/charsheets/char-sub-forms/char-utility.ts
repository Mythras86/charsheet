import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const Fajok: Array<any> = [
  {
    fajnev: 'Ember',
    karKockatartalekMin: 3,
    karKockatartalekMax: 3,
    defHeight: 180,
    defWieght: 75,
    defAge: 65,
    defKepessegek: [{kepesseg: '+3 Karmatartalék'}],
  },
  {
    fajnev: 'Tünde',
    karFizGyoMax: 1,
    karAsztAllMax: 2,
    defHeight: 180,
    defWieght: 70,
    defAge: 100,
    defKepessegek: [
      {kepesseg: 'Éjszakai látás'},
      {kepesseg: '1,2x jobb látás'},
      {kepesseg: '1,2x jobb hallás'},
    ],
  },
  {
    fajnev: 'Törpe',
    karFizEroMax: 2,
    karFizAll: 1,
    karAsztEroMax: 1,
    defHeight: 140,
    defWieght: 60,
    defAge: 100,
    defKepessegek: [
      {kepesseg: 'Hőlátás'},
      {kepesseg: 'Irányérzék'}
    ],
  },
  {
    fajnev: 'Ork',
    karFizEroMax: 2,
    karFizAllMax: 3,
    karAsztAllMax: -1,
    karAsztUgyMax: -1,
    defHeight: 190,
    defWieght: 95,
    defAge: 40,
    defKepessegek: [
      {kepesseg: 'Éjszakai látás'},
      {kepesseg: '1,2x jobb látás'},
      {kepesseg: '1,2x jobb hallás'},
    ],
  },
  {
    fajnev: 'Troll',
    karFizEroMax: 4,
    karFizGyoMax: -1,
    karFizAllMax: 4,
    karAsztAllMax: -2,
    karAsztUgyMax: -2,
    defHeight: 280,
    defWieght: 220,
    defAge: 50,
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

export const Nyelvek: Array<any> = [
  'magyar',
  'angol',
  'francia',
  'orosz',
  'japán',
  'kínai',
  'indiai',
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
  {list: 'elementalista', text: 'Egészség'},
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
