
import { Injectable } from '@angular/core';

export interface CalculatorData {
  service: string;
  objectType?: string;
  size: number; // in square meters
  floor: string;
  disassembly: boolean;
  wasteType: string;
}

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private BASE_RATE_PER_SQM = 15; // Base cost per square meter
  private SERVICE_MULTIPLIER: { [key: string]: number } = {
    'entruempelu-g': 1.0,
    'haushaltsaufloesung': 1.2,
    'bueroaufloesung': 1.3,
    'kellerentruempelung': 0.8,
  };
  private FLOOR_MULTIPLIER: { [key: string]: number } = {
    'eg': 1.0,
    'og': 1.15,
    'dg': 1.25,
    'aufzug': 1.05,
  };
  private WASTE_MULTIPLIER: { [key: string]: number } = {
    'normal': 1.0,
    'gemischt': 1.2,
    'sondermuell': 1.8,
  };
  private DISASSEMBLY_FEE_PER_SQM = 3;

  calculateCost(data: Partial<CalculatorData>): { min: number, max: number } | null {
    if (!data.service || !data.size || !data.floor || !data.wasteType) {
        return null;
    }

    let baseCost = data.size * this.BASE_RATE_PER_SQM;

    // Apply service multiplier
    baseCost *= this.SERVICE_MULTIPLIER[data.service] || 1.0;

    // Apply floor multiplier
    baseCost *= this.FLOOR_MULTIPLIER[data.floor];

    // Apply waste type multiplier
    baseCost *= this.WASTE_MULTIPLIER[data.wasteType];
    
    // Add disassembly fee if applicable
    if (data.disassembly) {
      baseCost += data.size * this.DISASSEMBLY_FEE_PER_SQM;
    }
    
    // Add a base fee for small jobs
    if(baseCost < 250) {
        baseCost = 250;
    }

    // Return a range (+/- 15%)
    const min = Math.round(baseCost * 0.85 / 10) * 10;
    const max = Math.round(baseCost * 1.15 / 10) * 10;

    return { min, max };
  }
}
