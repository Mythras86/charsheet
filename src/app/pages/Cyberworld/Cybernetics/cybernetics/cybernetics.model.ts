export interface Cybernetics {
  id: string,
  cyberneticName: string,
  cyberneticCategory: string,
  cyberneticMaxLevel: number,
  cyberneticPrice: number,
  cyberneticEssence: number,
  cyberneticDesc: string,
};

export interface CyberneticsDataInterface {
  cybernetics: Cybernetics[];
}
