import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { cancers } from '../data/cancers';


const CalculationsTable = ({ calculation, setTxtTables }: { calculation: any, setTxtTables: React.Dispatch<React.SetStateAction<any>> }) => {
  const [tables, setTables] = useState([]);
  const [absorptionTypes, setAbsorptionTypes] = useState<string[]>([]);

  const { radionuclide, formattedRadionuclide, age, exposureLengthYears, exposureLengthDays, intakeMethod } = calculation;

  useEffect(() => {
    (async () => {
      if (!radionuclide || !formattedRadionuclide || !age || age.includes(null) || exposureLengthYears.includes(null) || exposureLengthDays.includes(null) || !intakeMethod) {
        return;
      }

      const newTables: any = [];
      const usageTable: any = await invoke('usage');
      const survivalTable: any = await invoke('survival');
      const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: formattedRadionuclide }) : await invoke('ingestion_types', { radionuclide: formattedRadionuclide })
      const absorptionTypes = types.split("-");
      setAbsorptionTypes(absorptionTypes);

      if (intakeMethod == "inh") {
        for (let absorptionType = 0; absorptionType < absorptionTypes.length; absorptionType++) {
          const table: any = {}
          for (let i = 0; i < cancers.length; i++) {
            const calculations: number[] = [];
            const riskCoefficientsTable: any = await invoke(`coefficients`, { intakeMethod: (intakeMethod == 'inh') ? 'inhalation' : 'ingestion', radionuclide: formattedRadionuclide, absorptionType: absorptionTypes[absorptionType], cancer: cancers[i] });
            for (let j = 0; j < 6; j++) {
              let lifetimeRisk = 0;
              let unitIntake = 0;

              let survCol;
              let usageCol;
              if (j == 0 || j == 3) {
                survCol = 1;
                usageCol = 0;
              } else if (j == 1 || j == 4) {
                survCol = 2;
                usageCol = 1;
              } else {
                survCol = 0;
                usageCol = 0;
              }

              for (let x = 0; x < age.length; x++) {
                const startingYear = age[x];
                const endingYear = age[x] + exposureLengthYears[x];

                for (let k = startingYear; k <= endingYear; k++) {
                  if (k == startingYear || k == endingYear) {
                    lifetimeRisk += 0.5 * survivalTable[k][survCol] * usageTable[k][usageCol] * 365 * riskCoefficientsTable[k][j];
                    unitIntake += 0.5 * survivalTable[k][survCol] * usageTable[k][usageCol] * 365;
                  }
                  else {
                    lifetimeRisk += survivalTable[k][survCol] * usageTable[k][usageCol] * 365 * riskCoefficientsTable[k][j];
                    unitIntake += survivalTable[k][survCol] * usageTable[k][usageCol] * 365;
                  }
                }

                //fractional exposure

                const riskSlope = (riskCoefficientsTable[endingYear + 1][j] - riskCoefficientsTable[endingYear][j]) / 365; // units = /day
                const survSlope = (survivalTable[endingYear + 1][survCol] - survivalTable[endingYear][survCol]) / 365; //units = /day
                const usageSlope = (usageTable[endingYear + 1][usageCol] - usageTable[endingYear][usageCol]) / 365; //units = /day^2

                //trapezoidal integration = (b1 + b2) * 0.5h = [f(a) + f(b)] * 0.5dx
                const endingRisk = riskCoefficientsTable[endingYear][j]; //at ending year
                const endingSurv = survivalTable[endingYear][survCol];
                const endingUsage = usageTable[endingYear][usageCol];

                const riskFraction = endingRisk + (riskSlope * exposureLengthDays[x]);
                const survFraction = endingSurv + (survSlope * exposureLengthDays[x]);
                const usageFraction = endingUsage + (usageSlope * exposureLengthDays[x]);

                lifetimeRisk += (0.5 * exposureLengthDays[x] / 365) * ((endingSurv * endingUsage * 365 * endingRisk) + (survFraction * usageFraction * 365 * riskFraction));
                unitIntake += (0.5 * exposureLengthDays[x] / 365) * ((endingSurv * endingUsage * 365) + (survFraction * usageFraction * 365));
              }

              calculations.push(lifetimeRisk / unitIntake);
            }
            table[cancers[i]] = calculations;
          }
          newTables.push(table);
        }
        setTables(newTables);
        setTxtTables(newTables);
      } else { //ingestion
        for (let usage = 0; usage < 2; usage++) {
          for (let absorptionType = 0; absorptionType < absorptionTypes.length; absorptionType++) {
            const table: any = {}
            for (let i = 0; i < cancers.length; i++) {
              const calculations: number[] = [];
              const riskCoefficientsTable: any = await invoke(`coefficients`, { intakeMethod: (intakeMethod == 'inh') ? 'inhalation' : 'ingestion', radionuclide: formattedRadionuclide, absorptionType: absorptionTypes[absorptionType], cancer: cancers[i] });
              for (let j = 0; j < 6; j++) {
                let lifetimeRisk = 0;
                let unitIntake = 0;

                let survCol;
                let usageCol;
                if (usage == 0) { //tapwater
                  if (j == 0 || j == 3) {
                    survCol = 1;
                    usageCol = 2;
                  } else if (j == 1 || j == 4) {
                    survCol = 2;
                    usageCol = 3;
                  } else {
                    survCol = 0;
                    usageCol = 2;
                  }
                } else { //dietary
                  if (j == 0 || j == 3) {
                    survCol = 1;
                    usageCol = 4;
                  } else if (j == 1 || j == 4) {
                    survCol = 2;
                    usageCol = 5;
                  } else {
                    survCol = 0;
                    usageCol = 4;
                  }
                }

                for (let x = 0; x < age.length; x++) {
                  const startingYear = age[x];
                  const endingYear = age[x] + exposureLengthYears[x];

                  for (let k = startingYear; k <= endingYear; k++) {
                    if (k == startingYear || k == endingYear) {
                      lifetimeRisk += 0.5 * survivalTable[k][survCol] * usageTable[k][usageCol] * 365 * riskCoefficientsTable[k][j];
                      unitIntake += 0.5 * survivalTable[k][survCol] * usageTable[k][usageCol] * 365;
                    }
                    else {
                      lifetimeRisk += survivalTable[k][survCol] * usageTable[k][usageCol] * 365 * riskCoefficientsTable[k][j];
                      unitIntake += survivalTable[k][survCol] * usageTable[k][usageCol] * 365;
                    }
                  }

                  //fractional exposure

                  const riskSlope = (riskCoefficientsTable[endingYear + 1][j] - riskCoefficientsTable[endingYear][j]) / 365;
                  const survSlope = (survivalTable[endingYear + 1][survCol] - survivalTable[endingYear][survCol]) / 365;
                  const usageSlope = (usageTable[endingYear + 1][usageCol] - usageTable[endingYear][usageCol]) / 365;

                  //trapezoidal integration = (b1 + b2) * 0.5h = [f(a) + f(b)] * 0.5dx
                  const endingRisk = riskCoefficientsTable[endingYear][j]; //at ending year
                  const endingSurv = survivalTable[endingYear][survCol];
                  const endingUsage = usageTable[endingYear][usageCol];

                  const riskFraction = endingRisk + (riskSlope * exposureLengthDays[x]);
                  const survFraction = endingSurv + (survSlope * exposureLengthDays[x]);
                  const usageFraction = endingUsage + (usageSlope * exposureLengthDays[x]);

                  lifetimeRisk += (0.5 * exposureLengthDays[x] / 365) * ((endingSurv * endingUsage * 365 * endingRisk) + (survFraction * usageFraction * 365 * riskFraction));
                  unitIntake += (0.5 * exposureLengthDays[x] / 365) * ((endingSurv * endingUsage * 365) + (survFraction * usageFraction * 365));
                }

                calculations.push(lifetimeRisk / unitIntake);
              }
              table[cancers[i]] = calculations;
            }
            newTables.push(table);
          }
        }
        setTables(newTables);
        setTxtTables(newTables);
        setAbsorptionTypes([...absorptionTypes].concat(absorptionTypes))
      }
    })();
  }, [calculation])

  const agePlusExposure = (age) ? age.map((a: number, i: number) => a + exposureLengthYears[i]) : '';
  const exposedString = (age) ? `${radionuclide}, Exposed Ages: [${age.join(',')}]-[${agePlusExposure.join(',')}] and [${exposureLengthDays.join(',')}] Days` : '';

  return (
    <div className="grow p-20 h-screen overflow-auto dark:bg-neutral-900">
      <div id="tables" className="relative">
        {intakeMethod &&
          <div className="dark:text-white">
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
                  {Object.entries(table).map((entries: any, j) => {
                    return (
                      <tr key={j} className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white">
                        <td> {entries[0]} </td>
                        <td> {entries[1][0].toExponential(2)} </td>
                        <td> {entries[1][1].toExponential(2)} </td>
                        <td> {entries[1][2].toExponential(2)} </td>
                        <td> {entries[1][3].toExponential(2)} </td>
                        <td> {entries[1][4].toExponential(2)} </td>
                        <td> {entries[1][5].toExponential(2)} </td>
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