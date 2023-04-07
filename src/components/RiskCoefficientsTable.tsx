import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'

const RiskCoefficientsTable = ({ radionuclide, cancer, intakeMethod }: { radionuclide: string, cancer: string, intakeMethod: string }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    (async () => {
      const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: radionuclide }) : await invoke('ingestion_types', { radionuclide: radionuclide });
      const absorptionTypes = types.split("-");

      const newTables: any = [];
      for (let i = 0; i < absorptionTypes.length; i++) {
        const newTable = await invoke(`plugin:${intakeMethod}_${radionuclide}|${cancer}_${absorptionTypes[i]}`);
        newTables.push(newTable);
      }

      setTables(newTables);
    })();
  }, [radionuclide, cancer, intakeMethod]);

  return (
    <>
      {
        tables.map((table, i) => {
          return (
            <div>
              <table className="table-auto mx-auto text-left mt-20">
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
                  {Object.entries(table).map((entries: any) => {
                    return (
                      <tr className="odd:bg-epalightblue">
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
          )
        })
      }
    </>
  )
}

export default RiskCoefficientsTable;