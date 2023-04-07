import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { cancers } from '../data/cancers';


const CalculationsTable = ({ calculation, setTxtTables }: { calculation: any, setTxtTables: React.Dispatch<React.SetStateAction<any>> }) => {
  const [tables, setTables] = useState([]);
  const [absorptionTypes, setAbsorptionTypes] = useState<string[]>([]);

  const { radionuclide, age, exposureLength, intakeMethod } = calculation;

  useEffect(() => {
    (async () => {
      const newTables: any = [];
      const usageTable: any = await invoke('usage');
      const survivalTable: any = await invoke('survival');
      const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: radionuclide }) : await invoke('ingestion_types', { radionuclide: radionuclide })
      const absorptionTypes = types.split("-");
      setAbsorptionTypes(absorptionTypes);

      if (intakeMethod == "inh") {
        for (let absorptionType = 0; absorptionType < absorptionTypes.length; absorptionType++) {
          const table: any = {}
          for (let i = 0; i < cancers.length; i++) {
            const calculations: number[] = [];
            const riskCoefficientsTable: any = await invoke(`plugin:${intakeMethod}_${radionuclide}|${cancers[i]}_${absorptionTypes[absorptionType]}`);
            for (let j = 0; j < 6; j++) {
              let lifetimeRisk = 0;
              let unitIntake = 0;
              const startingYear = age;
              const endingYear = age + exposureLength;
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
              calculations.push(lifetimeRisk / unitIntake);
            }
            table[cancers[i]] = calculations;
          }
          newTables.push(table);
        }
        setTables(newTables);
        setTxtTables(newTables);
      } else {
        for (let usage = 0; usage < 2; usage++) {
          for (let absorptionType = 0; absorptionType < absorptionTypes.length; absorptionType++) {
            const table: any = {}
            for (let i = 0; i < cancers.length; i++) {
              const calculations: number[] = [];
              const riskCoefficientsTable: any = await invoke(`plugin:${intakeMethod}_${radionuclide}|${cancers[i]}_${absorptionTypes[absorptionType]}`);
              for (let j = 0; j < 6; j++) {
                let lifetimeRisk = 0;
                let unitIntake = 0;
                const startingYear = age;
                const endingYear = age + exposureLength;
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

  return (
    <div className="grow p-20 h-screen overflow-auto">
      <div id="tables" className="relative">
        {tables.map((table, i) => {
          return (
            <div key={i}>
              <h1 className="text-center font-bold text-2xl">{radionuclide} {age}-{age + exposureLength} {absorptionTypes[i]}</h1>
              <table className="table-auto mx-auto text-left my-5">
                <thead className="bg-epablue text-white">
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
                      <tr key={j} className="odd:bg-epalightblue">
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