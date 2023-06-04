import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { cancers } from '../data/cancers';
import { InputData, OutputData, Calculation, RiskFunction, RiskCoefficientColumn, SurvDataColumn, UsageDataColumn } from '../utils';

const enum IngestionType {
  Tapwater,
  Dietary
}

const CalculationsTable = ({ calculation, setTxtTables }: { calculation: Calculation | {}, setTxtTables: React.Dispatch<React.SetStateAction<OutputData[]>> }) => {
  const [tables, setTables] = useState<OutputData[]>([]);
  const [absorptionTypes, setAbsorptionTypes] = useState<string[]>([]);

  const { radionuclide, formattedRadionuclide, age, exposureLengthYears, exposureLengthDays, intakeMethod } = calculation as Calculation;

  useEffect(() => {
    (async () => {
      if (radionuclide == null) {
        return;
      }

      const newTables: OutputData[] = [];
      const usageTable: InputData = await invoke('usage');
      const survivalTable: InputData = await invoke('survival');
      const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: formattedRadionuclide }) : await invoke('ingestion_types', { radionuclide: formattedRadionuclide })
      const absorptionTypes = types.split("-");
      setAbsorptionTypes(absorptionTypes);

      if (intakeMethod == "inh") {
        for (let absorptionType = 0; absorptionType < absorptionTypes.length; absorptionType++) {
          const table: { [index: string]: number[] } = {}
          for (let cancer = 0; cancer < cancers.length; cancer++) {
            const calculations: number[] = [];
            const riskCoefficientsTable: InputData = await invoke(`coefficients`, { intakeMethod: (intakeMethod == 'inh') ? 'inhalation' : 'ingestion', radionuclide: formattedRadionuclide, absorptionType: absorptionTypes[absorptionType], cancer: cancers[cancer] });
            for (let tableCol = 0; tableCol < 6; tableCol++) {
              let lifetimeRisk = 0;
              let unitIntake = 0;
              let survCol;
              let usageCol;

              if (tableCol == RiskCoefficientColumn.MaleMortality || tableCol == RiskCoefficientColumn.MaleMorbidity) {
                survCol = SurvDataColumn.MaleSurvival;
                usageCol = UsageDataColumn.MaleInhalation;
              } else if (tableCol == RiskCoefficientColumn.FemaleMortality || tableCol == RiskCoefficientColumn.FemaleMorbidity) {
                survCol = SurvDataColumn.FemaleSurvival;
                usageCol = UsageDataColumn.FemaleInhalation;
              } else {
                survCol = SurvDataColumn.CombinedSurvival;
                usageCol = UsageDataColumn.MaleInhalation;
              }

              for (let ageRange = 0; ageRange < age.length; ageRange++) {
                const startingYear = age[ageRange];
                const endingYear = age[ageRange] + exposureLengthYears[ageRange];

                for (let year = startingYear; year <= endingYear; year++) {
                  if (year == startingYear || year == endingYear) {
                    lifetimeRisk += 0.5 * survivalTable[year][survCol] * usageTable[year][usageCol] * 365 * riskCoefficientsTable[year][tableCol];
                    unitIntake += 0.5 * survivalTable[year][survCol] * usageTable[year][usageCol] * 365;
                  }
                  else {
                    lifetimeRisk += survivalTable[year][survCol] * usageTable[year][usageCol] * 365 * riskCoefficientsTable[year][tableCol];
                    unitIntake += survivalTable[year][survCol] * usageTable[year][usageCol] * 365;
                  }
                }

                //fractional exposure
                const riskSlope = (riskCoefficientsTable[endingYear + 1][tableCol] - riskCoefficientsTable[endingYear][tableCol]) / 365; // units = /day
                const survSlope = (survivalTable[endingYear + 1][survCol] - survivalTable[endingYear][survCol]) / 365; //units = /day
                const usageSlope = (usageTable[endingYear + 1][usageCol] - usageTable[endingYear][usageCol]) / 365; //units = /day^2

                //trapezoidal integration = (b1 + b2) * 0.5h = [f(a) + f(b)] * 0.5dx
                const endingRisk = riskCoefficientsTable[endingYear][tableCol]; //at ending year
                const endingSurv = survivalTable[endingYear][survCol];
                const endingUsage = usageTable[endingYear][usageCol];

                const riskFraction = endingRisk + (riskSlope * exposureLengthDays[ageRange]);
                const survFraction = endingSurv + (survSlope * exposureLengthDays[ageRange]);
                const usageFraction = endingUsage + (usageSlope * exposureLengthDays[ageRange]);

                lifetimeRisk += (0.5 * exposureLengthDays[ageRange] / 365) * ((endingSurv * endingUsage * 365 * endingRisk) + (survFraction * usageFraction * 365 * riskFraction));
                unitIntake += (0.5 * exposureLengthDays[ageRange] / 365) * ((endingSurv * endingUsage * 365) + (survFraction * usageFraction * 365));
              }

              calculations.push(lifetimeRisk / unitIntake);
            }
            table[cancers[cancer]] = calculations;
          }
          newTables.push(table as unknown as OutputData);
        }
        setTables(newTables);
        setTxtTables(newTables);
      } else { //ingestion
        for (let ingestionType = 0; ingestionType < 2; ingestionType++) {
          for (let absorptionType = 0; absorptionType < absorptionTypes.length; absorptionType++) {
            const table: { [index: string]: number[] } = {}
            for (let cancer = 0; cancer < cancers.length; cancer++) {
              const calculations: number[] = [];
              const riskCoefficientsTable: InputData = await invoke(`coefficients`, { intakeMethod: (intakeMethod == 'inh') ? 'inhalation' : 'ingestion', radionuclide: formattedRadionuclide, absorptionType: absorptionTypes[absorptionType], cancer: cancers[cancer] });
              for (let tableCol = 0; tableCol < 6; tableCol++) {
                let lifetimeRisk = 0;
                let unitIntake = 0;

                let survCol;
                let usageCol;
                if (ingestionType == IngestionType.Tapwater) { //tapwater
                  if (tableCol == RiskCoefficientColumn.MaleMortality || tableCol == RiskCoefficientColumn.MaleMorbidity) {
                    survCol = SurvDataColumn.MaleSurvival;
                    usageCol = UsageDataColumn.MaleTapwater;
                  } else if (tableCol == RiskCoefficientColumn.FemaleMortality || tableCol == RiskCoefficientColumn.FemaleMorbidity) {
                    survCol = SurvDataColumn.FemaleSurvival;
                    usageCol = UsageDataColumn.FemaleTapwater;
                  } else {
                    survCol = SurvDataColumn.CombinedSurvival;
                    usageCol = UsageDataColumn.MaleTapwater;;
                  }
                } else { //dietary
                  if (tableCol == RiskCoefficientColumn.MaleMortality || tableCol == RiskCoefficientColumn.MaleMorbidity) {
                    survCol = SurvDataColumn.MaleSurvival;
                    usageCol = UsageDataColumn.MaleDietary;
                  } else if (tableCol == RiskCoefficientColumn.FemaleMortality || tableCol == RiskCoefficientColumn.FemaleMorbidity) {
                    survCol = SurvDataColumn.FemaleSurvival;
                    usageCol = UsageDataColumn.FemaleDietary;
                  } else {
                    survCol = SurvDataColumn.CombinedSurvival;
                    usageCol = UsageDataColumn.MaleDietary;
                  }
                }

                for (let ageRange = 0; ageRange < age.length; ageRange++) {
                  const startingYear = age[ageRange];
                  const endingYear = age[ageRange] + exposureLengthYears[ageRange];

                  for (let year = startingYear; year <= endingYear; year++) {
                    if (year == startingYear || year == endingYear) {
                      lifetimeRisk += 0.5 * survivalTable[year][survCol] * usageTable[year][usageCol] * 365 * riskCoefficientsTable[year][tableCol];
                      unitIntake += 0.5 * survivalTable[year][survCol] * usageTable[year][usageCol] * 365;
                    }
                    else {
                      lifetimeRisk += survivalTable[year][survCol] * usageTable[year][usageCol] * 365 * riskCoefficientsTable[year][tableCol];
                      unitIntake += survivalTable[year][survCol] * usageTable[year][usageCol] * 365;
                    }
                  }

                  //fractional exposure

                  const riskSlope = (riskCoefficientsTable[endingYear + 1][tableCol] - riskCoefficientsTable[endingYear][tableCol]) / 365;
                  const survSlope = (survivalTable[endingYear + 1][survCol] - survivalTable[endingYear][survCol]) / 365;
                  const usageSlope = (usageTable[endingYear + 1][usageCol] - usageTable[endingYear][usageCol]) / 365;

                  //trapezoidal integration = (b1 + b2) * 0.5h = [f(a) + f(b)] * 0.5dx
                  const endingRisk = riskCoefficientsTable[endingYear][tableCol]; //at ending year
                  const endingSurv = survivalTable[endingYear][survCol];
                  const endingUsage = usageTable[endingYear][usageCol];

                  const riskFraction = endingRisk + (riskSlope * exposureLengthDays[ageRange]);
                  const survFraction = endingSurv + (survSlope * exposureLengthDays[ageRange]);
                  const usageFraction = endingUsage + (usageSlope * exposureLengthDays[ageRange]);

                  lifetimeRisk += (0.5 * exposureLengthDays[ageRange] / 365) * ((endingSurv * endingUsage * 365 * endingRisk) + (survFraction * usageFraction * 365 * riskFraction));
                  unitIntake += (0.5 * exposureLengthDays[ageRange] / 365) * ((endingSurv * endingUsage * 365) + (survFraction * usageFraction * 365));
                }
                calculations.push(lifetimeRisk / unitIntake);
              }
              table[cancers[cancer]] = calculations;
            }
            newTables.push(table as unknown as OutputData);
          }
        }
        setTables(newTables);
        setTxtTables(newTables);
        setAbsorptionTypes([...absorptionTypes].concat(absorptionTypes))
      }
    })();
  }, [calculation])

  const agePlusExposure = (age) ? age.map((a: number, i: number) => a + exposureLengthYears[i]) : '';
  const exposedString = (age) ? `${radionuclide}, Exposed Ages: ${age.map((a: number, i: number) => `${age[i]}-${agePlusExposure[i]} Years and ${exposureLengthDays[i]} Days`).join(', ')}` : '';

  return (
    <div className="grow p-20 h-screen overflow-auto dark:bg-neutral-900">
      <div id="tables" className="relative">
        {intakeMethod &&
          <div className="dark:text-white mx-auto w-[950px]">
            <h1 className="text-center font-bold text-3xl mb-3"> {(intakeMethod == 'inh') ? 'Inhalation' : 'Ingestion'} Risk Coefficients</h1>
            <h2 className="text-center font-bold text-2xl mb-20">{exposedString}</h2>
          </div>
        }
        {tables.map((table, i) => {
          return (
            <div key={i}>
              {absorptionTypes[i] && <h1 className="text-center font-bold text-2xl mb-5 dark:text-white">Absorption Type: {(intakeMethod == 'ing' && i < absorptionTypes.length / 2) ? 'Drinking Water' : (intakeMethod == 'ing') ? 'Diet' : ''}{(absorptionTypes[i] !== 'n' && intakeMethod == 'inh') ? absorptionTypes[i].toUpperCase() : (absorptionTypes[i] !== 'n' && intakeMethod == 'ing') ? ' (' + absorptionTypes[i].toUpperCase() + ')' : ''}</h1>}
              <table className="table-auto mx-auto text-left mb-20">
                <thead className="bg-epablue text-white dark:bg-epagreen">
                  <tr>
                    <th />
                    <th colSpan={3}>Mortality (/Bq)</th>
                    <th colSpan={3}>Morbidity (/Bq)</th>
                  </tr>
                  <tr>
                    <th className="pr-10">Cancer</th>
                    <th className="pr-20">Male</th>
                    <th className="pr-20">Female</th>
                    <th className="pr-20">Both</th>
                    <th className="pr-20">Male</th>
                    <th className="pr-20">Female</th>
                    <th className="pr-20">Both</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(table).map((entries: [string, number[]], j) => {
                    return (
                      <tr key={j} className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white">
                        <td> {entries[RiskFunction.Age]} </td>
                        <td> {entries[RiskFunction.RiskCoefficients][RiskCoefficientColumn.MaleMortality].toExponential(2)} </td>
                        <td> {entries[RiskFunction.RiskCoefficients][RiskCoefficientColumn.FemaleMortality].toExponential(2)} </td>
                        <td> {entries[RiskFunction.RiskCoefficients][RiskCoefficientColumn.BothMortality].toExponential(2)} </td>
                        <td> {entries[RiskFunction.RiskCoefficients][RiskCoefficientColumn.MaleMorbidity].toExponential(2)} </td>
                        <td> {entries[RiskFunction.RiskCoefficients][RiskCoefficientColumn.FemaleMorbidity].toExponential(2)} </td>
                        <td> {entries[RiskFunction.RiskCoefficients][RiskCoefficientColumn.BothMorbidity].toExponential(2)} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
        }
      </div>
    </div>
  )
}

export default CalculationsTable;