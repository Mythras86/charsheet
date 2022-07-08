export interface Resources {
  basekarma: number,
  gainedkarma: number,
  karmaonattr: number,
  karmaonskills: number,
  karmaonmoney: number,
  gainedmoney: number,
  karmaonmagic: number,
}

export const resources: Array<any> = [
  {nev: 'Induló Karma', fcname: 'basekarma', maxValue: 250, hide: true},
  {nev: 'Kapott Karma', fcname: 'gainedkarma', maxValue: 50, hide: true},
  {nev: 'Tulajdonságok (3karma/1pont)', fcname: 'karmaonattr', lepes:3, maxValue: 40, hide: false},
  {nev: 'Szakértelmek (2karma/1pont)', fcname: 'karmaonskills', lepes:2, maxValue: 60, hide: false},
  {nev: 'Erőforrások (1karma/6000cred)', fcname: 'karmaonmoney', maxValue: 150, hide: false},
  {nev: 'Szerzett erőforrások',  fcname: 'gainedmoney', hide: true},
  {nev: 'Mágia pontok (2karma/1pont)', fcname: 'karmaonmagic', lepes:2, maxValue: 65, hide: false},
];
