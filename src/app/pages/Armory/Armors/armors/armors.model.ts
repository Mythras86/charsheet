export interface Armors {
  id: string,
  armorName: string,
  armorCategory: string,
  armorRating: number,
  armorWeight: number,
  armorPrice: number,
  armorDesc: string,
};

export interface ArmorsDataInterface {
  armors: Armors[];
}
