export interface Equipments {
  id: string,
  equipmentName: string,
  equipmentCategory: string,
  equipmentLevel: number,
  equipmentWeight: number,
  equipmentPrice: number,
  equipmentDesc: string,
};

export interface EquipmentsDataInterface {
  equipments: Equipments[];
}
