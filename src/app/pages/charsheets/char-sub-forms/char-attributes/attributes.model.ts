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
  karEsszencia: number,
  karMagia: number,
  karErzekeles: number,
  karKockatartalek: number,
};

export const attributes: Array<any> = [
  //fizikai
  {nev: 'Erő', fcname:'karFizEro', csoport: 'Fizikum', karFizEromin: 1},
  {nev: 'Reakció', fcname:'karFizGyo', csoport: 'Fizikum', karFizGyomin: 1},
  {nev: 'Ügyesség', fcname:'karFizUgy', csoport: 'Fizikum', karFizUgymin: 1},
  {nev: 'Kitartás', fcname:'karFizAll', csoport: 'Fizikum', karFizAllmin: 1},
  //szellemi
  {nev: 'Akaraterő', fcname:'karAsztEro', csoport: 'Asztrál', karAsztEromin: 1},
  {nev: 'Intuíció', fcname:'karAsztGyo', csoport: 'Asztrál', karAsztGyomin: 1},
  {nev: 'Logika', fcname:'karAsztUgy', csoport: 'Asztrál', karAsztUgymin: 1},
  {nev: 'Karizma', fcname:'karAsztAll', csoport: 'Asztrál', karAsztAllmin: 1},
  //speciális
  {nev: 'Esszencia', fcname:'karEsszencia', csoport: 'Speciális', karEsszenciamin: 6},
  {nev: 'Mágia', fcname:'karMagia', csoport: 'Speciális', karMagiamin: 0},
  {nev: 'Érzékelés', fcname:'karErzekeles', csoport: 'Speciális', karErzekelesmin: 1},
  {nev: 'Kockatartalék', fcname:'karKockatartalek', csoport: 'Speciális', karKockatartalekmin: 0},
];
