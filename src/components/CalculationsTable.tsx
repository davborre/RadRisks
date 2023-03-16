import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { cancers } from '../data/cancers';


const CalculationsTable = ({ calculation }: { calculation: any }) => {
  const [tables, setTables] = useState([]);

  const { radionuclide, age, exposureLength, intakeMethod } = calculation;

  useEffect(() => {
    (async () => {
      const newTables: any = [];
      const usageTable: any = await invoke('usage');
      const survivalTable: any = await invoke('survival');
      const table: any = {}

      for (let i = 0; i < cancers.length; i++) {
        const calculations: number[] = [];
        const riskCoefficientsTable: any = await invoke(`plugin:${intakeMethod}_${radionuclide}|${cancers[i]}_f`);
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
      setTables(newTables);
    })();
  }, [calculation])

  return (
    <div>
      {tables.map((table, i) => {
        return (
          <table key={i} className="table-auto mx-auto text-left mt-5">
            <thead className="bg-epablue text-white">
              <tr>
                <th />
                <th colSpan={3}>Mortality (/Bq)</th>
                <th colSpan={3}>Morbidity (/Bq)</th>
              </tr>
              <tr>
                <th className="pr-10">Age</th>
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
        );
      })
      }
    </div>
  )
}

export default CalculationsTable;