export interface Weapons {
  id: string,
  weaponName: string,
  weaponCategory: string,
  weaponType: string,
  weaponClip: string,
  weaponMods: string,
  weaponRange: number,
  weaponPower: number,
  weaponDamage: number,
  weaponDmgType: string,
  weaponWeight: number,
  weaponPrice: number,
  weaponDesc: string,
};

export interface WeaponsDataInterface {
  weapons: Weapons[];
}
