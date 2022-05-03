export interface Attributes {
  //fizikai
  karFizEro: number,
  karFizGyo: number,
  karFizUgy: number,
  karFizAll: number,
  //szellemi
  karAsztEro: number,
  karAsztGyo: number,
  karAsztUgy: number,
  karAsztAll: number,
  //speciális
  karMagia: number,
  karKockatartalek: number,
};

export const attributes: Array<any> = [
  //fizikai
  {nev: 'Erő', rovidnev: 'Erő', fcname:'karFizEro', csoport: 'Fizikum', karFizEromin: 1},
  {nev: 'Reakció', rovidnev: 'Rea', fcname:'karFizGyo', csoport: 'Fizikum', karFizGyomin: 1},
  {nev: 'Ügyesség', rovidnev: 'Ügy', fcname:'karFizUgy', csoport: 'Fizikum', karFizUgymin: 1},
  {nev: 'Kitartás', rovidnev: 'Kit', fcname:'karFizAll', csoport: 'Fizikum', karFizAllmin: 1},
  //szellemi
  {nev: 'Akaraterő', rovidnev: 'Aka', fcname:'karAsztEro', csoport: 'Asztrál', karAsztEromin: 1},
  {nev: 'Intuíció', rovidnev: 'Int', fcname:'karAsztGyo', csoport: 'Asztrál', karAsztGyomin: 1},
  {nev: 'Logika', rovidnev: 'Log', fcname:'karAsztUgy', csoport: 'Asztrál', karAsztUgymin: 1},
  {nev: 'Karizma', rovidnev: 'Kar', fcname:'karAsztAll', csoport: 'Asztrál', karAsztAllmin: 1},
  //speciális
  {nev: 'Mágia', rovidnev: 'Mág', fcname:'karMagia', csoport: 'Speciális', karMagiamin: 0},
  {nev: 'Kockatartalék', rovidnev: 'Ktart', fcname:'karKockatartalek', csoport: 'Speciális', karKockatartalekmin: 0},
];
