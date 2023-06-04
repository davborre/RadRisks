import { invoke } from "@tauri-apps/api/tauri";

export const enum TableColumn {
  Age,
  RiskCoefficients
}

export const enum RiskCoefficientColumn {
  MaleMortality,
  FemaleMortality,
  BothMortality,
  MaleMorbidity,
  FemaleMorbidity,
  BothMorbidity
}

export const enum SurvDataColumn {
  CombinedSurvival,
  MaleSurvival,
  FemaleSurvival,
  CombinedLifetime,
  MaleLifetime,
  FemaleLifetime,
  CombinedRatio
}

export const enum UsageDataColumn {
  MaleInhalation,
  FemaleInhalation,
  MaleTapwater,
  FemaleTapwater,
  MaleDietary,
  FemaleDietary
}

export interface Calculation {
  radionuclide: string;
  formattedRadionuclide: string;
  age: number[];
  exposureLengthYears: number[];
  exposureLengthDays: number[];
  intakeMethod: string;
}

export async function formatTextContent(txtTables: Object[], lastCalculation: Calculation): Promise<string> {
  const { radionuclide, formattedRadionuclide, age, exposureLengthYears, exposureLengthDays, intakeMethod } = lastCalculation;

  const agePlusExposure = age.map((a: number, i: number) => a + exposureLengthYears[i]);
  const exposedString = `${radionuclide}, Exposed Ages: ${age.map((a: number, i: number) => `${age[i]}-${agePlusExposure[i]} Years and ${exposureLengthDays[i]} Days`).join(', ')}`;

  let text = ' '.repeat(24) + ((intakeMethod == 'inh') ? 'Inhalation' : 'Ingestion');
  text += ' Risk Coefficients\n'
  text += ' '.repeat((75 - exposedString.length) / 2) + `${exposedString}\n`;

  const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: formattedRadionuclide }) : await invoke('ingestion_types', { radionuclide: formattedRadionuclide })
  const absorptionTypes = (intakeMethod == 'ing') ? types.split("-").concat(types.split("-")) : types.split("-");

  console.log(absorptionTypes)

  for (let i = 0; i < txtTables.length; i++) {
    text += `
                             Absorption Type: ${(intakeMethod == 'ing' && i < absorptionTypes.length / 2) ? 'Drinking Water' : (intakeMethod == 'ing') ? 'Diet' : ''}${(absorptionTypes[i] !== 'n' && intakeMethod == 'inh') ? absorptionTypes[i].toUpperCase() : (absorptionTypes[i] !== 'n' && intakeMethod == 'ing') ? ' (' + absorptionTypes[i].toUpperCase() + ')' : ''}
            --------Mortality (/Bq)--------   -------Morbidity (/Bq)------- 
 Cancer     Male        Female         Both   Male        Female        Both
 ---------------------------------------------------------------------------\n`;

    Object.entries(txtTables[i]).map((entries) => {
      text += ` ${entries[0]}${' '.repeat(12 - entries[0].length)}${entries[1].map((entry: number) => String(entry.toExponential(2)) + ' '.repeat(8 - String(entry.toExponential(2)).length)).join('   ')}\n`
    })
  }

  return text;
}

export interface InputData {
  [index: number]: number[];
}

export interface OutputData {
  esophagus: number[];
  stomach: number[];
  colon: number[];
  liver: number[];
  lung: number[];
  bone: number[];
  skin: number[];
  breast: number[];
  ovary: number[];
  bladder: number[];
  kidney: number[];
  thyroid: number[];
  leukemia: number[];
  residual: number[];
}