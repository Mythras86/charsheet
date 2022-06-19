export interface Addons {
  id: string,
  addonName: string,
  addonCategory: string,
  addonPlace: string,
  addonWeight: number,
  addonPrice: number,
  addonDesc: string,
}

export interface AddonsDataInterface {
  addons: Addons[];
}
