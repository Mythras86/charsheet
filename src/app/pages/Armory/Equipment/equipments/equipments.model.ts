export interface Equipments {
  id: string,
  equipmentName: string,
  equipmentCategory: string,
  equipmentMaxLevel: number,
  equipmentWeight: number,
  equipmentPrice: number,
  equipmentDesc: string,
};

export interface EquipmentsDataInterface {
  equipments: Equipments[];
}
