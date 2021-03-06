export interface WeaponAddons {
  id: string,
  addonName: string,
  addonCategory: string,
  addonPlace: string,
  addonAddWeight: number,
  addonAddPrice: number,
  addonMultiWeight: number,
  addonMultiPrice: number,
  addonDesc: string,
}

export interface WeaponAddonsDataInterface {
  addons: WeaponAddons[];
}
