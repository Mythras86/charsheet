export interface Attributes {
  //fizikai
  ero: number,
  gyo: number,
  ugy: number,
  kit: number,
  //szellemi
  aka: number,
  int: number,
  log: number,
  fegy: number,
  //speciális
  ess: number,
  mag: number,
  kta: number,
  kezd: number,
};

export const Attributes: Array<any> = [
  //fizikai
  {nev: 'Erő', fcname:'ero', csoport: 'Fizikum', eromin: 1},
  {nev: 'Gyorsaság', fcname:'gyo', csoport: 'Fizikum', gyomin: 1},
  {nev: 'Ügyesség', fcname:'ugy', csoport: 'Fizikum', ugymin: 1},
  {nev: 'Kitartás', fcname:'kit', csoport: 'Fizikum', kitmin: 1},
  //szellemi
  {nev: 'Akaraterő', fcname:'aka', csoport: 'Asztrális', akamin: 1},
  {nev: 'Intuíció', fcname:'int', csoport: 'Asztrális', intmin: 1},
  {nev: 'Logika', fcname:'log', csoport: 'Asztrális', logmin: 1},
  {nev: 'Fegyelem', fcname:'fegy', csoport: 'Asztrális', fegymin: 1},
  //speciális
  {nev: 'Mágia', fcname:'mag', csoport: 'Speciális', magmin: 0},
  {nev: 'Kockatartalék', fcname:'kta', csoport: 'Speciális', ktamin: 0},
  {nev: 'Esszencia', fcname:'ess', csoport: 'Speciális', essmin: 6, buttonstatus: "disabled"},
  {nev: 'Kezdeményezés', fcname:'kezd', csoport: 'Speciális', kezdmin: 0, buttonstatus: "disabled"},
];
