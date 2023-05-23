import { invoke } from "@tauri-apps/api/tauri";

export async function formatTextContent(txtTables: Object[], lastCalculation: any): Promise<string> {
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
  0: number[];
  1: number[];
  2: number[];
  3: number[];
  4: number[];
  5: number[];
  6: number[];
  7: number[];
  8: number[];
  9: number[];
  10: number[];
  11: number[];
  12: number[];
  13: number[];
  14: number[];
  15: number[];
  16: number[];
  17: number[];
  18: number[];
  19: number[];
  20: number[];
  21: number[];
  22: number[];
  23: number[];
  24: number[];
  25: number[];
  26: number[];
  27: number[];
  28: number[];
  29: number[];
  30: number[];
  31: number[];
  32: number[];
  33: number[];
  34: number[];
  35: number[];
  36: number[];
  37: number[];
  38: number[];
  39: number[];
  40: number[];
  41: number[];
  42: number[];
  43: number[];
  44: number[];
  45: number[];
  46: number[];
  47: number[];
  48: number[];
  49: number[];
  50: number[];
  51: number[];
  52: number[];
  53: number[];
  54: number[];
  55: number[];
  56: number[];
  57: number[];
  58: number[];
  59: number[];
  60: number[];
  61: number[];
  62: number[];
  63: number[];
  64: number[];
  65: number[];
  66: number[];
  67: number[];
  68: number[];
  69: number[];
  70: number[];
  71: number[];
  72: number[];
  73: number[];
  74: number[];
  75: number[];
  76: number[];
  77: number[];
  78: number[];
  79: number[];
  80: number[];
  81: number[];
  82: number[];
  83: number[];
  84: number[];
  85: number[];
  86: number[];
  87: number[];
  88: number[];
  89: number[];
  90: number[];
  91: number[];
  92: number[];
  93: number[];
  94: number[];
  95: number[];
  96: number[];
  97: number[];
  98: number[];
  99: number[];
  100: number[];
  101: number[];
  102: number[];
  103: number[];
  104: number[];
  105: number[];
  106: number[];
  107: number[];
  108: number[];
  109: number[];
  110: number[];
  111?: number[];
  112?: number[];
  113?: number[];
  114?: number[];
  115?: number[];
  116?: number[];
  117?: number[];
  118?: number[];
  119?: number[];
  120?: number[];
}