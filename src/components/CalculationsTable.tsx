import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';
import { cancers } from '../data/cancers';


const CalculationsTable = ({ calculation }: { calculation: any }) => {
  const [tables, setTables] = useState([]);

  const { radionuclide, age, exposureLength, intakeMethod } = calculation;

  useEffect(() => {
    setTables([]);
    const newTables: any = [];
    Promise.all([invoke("usage"), invoke("survival")])
      .then((results) => {
        const usageTable: any = results[0];
        console.log(usageTable);
        const survivalTable: any = results[1];
        console.log(survivalTable);
        const table: any = {};
        cancers.forEach((cancer) => {
          const calculations: number[] = [];
          Promise.resolve(invoke(`plugin:${intakeMethod}_${radionuclide}|${cancer}_f`))
            .then((riskCoefficients: any) => {
              for (let i = 0; i < 6; i++) {
                let lifetimeRisk = 0;
                let unitIntake = 0;
                const startingYear = age;
                const endingYear = age + exposureLength;
                for (let j = startingYear; j <= endingYear; j++) {
                  if (j == startingYear || j == endingYear) {
                    lifetimeRisk += 0.5 * survivalTable[`${j}`][1] * usageTable[`${j}`][0] * 365 * riskCoefficients[`${j}`][i];
                    unitIntake += 0.5 * survivalTable[`${j}`][1] * usageTable[`${j}`][0] * 365;
                  }
                  else {
                    lifetimeRisk += survivalTable[`${j}`][1] * usageTable[`${j}`][0] * 365 * riskCoefficients[`${j}`][i];
                    unitIntake += survivalTable[`${j}`][1] * usageTable[`${j}`][0] * 365;
                  }
                }
                calculations.push(lifetimeRisk / unitIntake);
              }

              table[cancer] = calculations;
            })
          newTables.push(table);
        });
      })

    setTables(newTables);
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