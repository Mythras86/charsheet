export interface ArmorAddons {
  id: string,
  addonName: string,
  addonPlace: string,
  addonAddWeight: number,
  addonAddPrice: number,
  addonMultiWeight: number,
  addonMultiPrice: number,
  addonDesc: string,
}

export interface ArmorAddonsDataInterface {
  addons: ArmorAddons[];
}
