  export interface ValasztottFaj {
  fajnev: string,
  eroMod: number,
  gyoMod: number,
  ugyMod: number,
  fizMod: number,
  akaMod: number,
  intMod: number,
  logMod: number,
  kitMod: number,
  karMod: number,
  magMod: number,
  ktaMod: number,
  erzMod: number,
  defHeight: number,
  defWieght: number,
  defAge: number,
  defKepessegek: [{kepesseg: string}],
}

export const Fajok: Array<any> = [
  {
    fajnev: 'Ember',
    eroMod: 0, gyoMod: 0, ugyMod: 0, fizMod: 0,
    akaMod: 0, intMod: 0, logMod: 0, kitMod: 0,
    karMod: 0, magMod: 0, ktaMod: 3, erzMod: 0,
    defHeight: 180, defWieght: 75, defAge: 30,
    defKepessegek: [{kepesseg: '+3 Karmatartalék'}],
  },
  {
    fajnev: 'Tünde',
    eroMod: 0, gyoMod: 1, ugyMod: 0, fizMod: 0,
    akaMod: 0, intMod: 0, logMod: 0, kitMod: 0,
    karMod: 2, magMod: 0, ktaMod: 0, erzMod: 0,
    defHeight: 180, defWieght: 70, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Éjszakai látás'},
      {kepesseg: '1,2x jobb látás'},
      {kepesseg: '1,2x jobb hallás'},
    ],
  },
  {
    fajnev: 'Törpe',
    eroMod: 2, gyoMod: -1, ugyMod: 0, fizMod: 1,
    akaMod: 1, intMod: 0, logMod: 0, kitMod: 0,
    karMod: 0, magMod: 0, ktaMod: 0, erzMod: 0,
    defHeight: 140, defWieght: 60, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Hőlátás'},
      {kepesseg: 'Irányérzék'}
    ],
  },
  {
    fajnev: 'Ork',
    eroMod: 2, gyoMod: 0, ugyMod: 0, fizMod: 3,
    akaMod: 0, intMod: 0, logMod: -1, kitMod: 0,
    karMod: -1, magMod: 0, ktaMod: 0, erzMod: 0,
    defHeight: 190, defWieght: 95, defAge: 30,
    defKepessegek: [
      {kepesseg: 'Éjszakai látás'},
      {kepesseg: '1,2x jobb látás'},
      {kepesseg: '1,2x jobb hallás'},
    ],
  },
  {
    fajnev: 'Troll',
    eroMod: 4, gyoMod: -1, ugyMod: 0, fizMod: 4,
    akaMod: 0, intMod: 0, logMod: -2, kitMod: 0,
    karMod: -2, magMod: 0, ktaMod: 0, erzMod: 0,
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
