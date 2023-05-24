import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { InputData } from '../utils';

const RiskCoefficientsTable = ({ radionuclide, cancer, intakeMethod }: { radionuclide: string, cancer: string, intakeMethod: string }) => {
  const [tables, setTables] = useState<InputData[]>([]);
  const [absorptionTypes, setAbsorptionTypes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const radionuclideNoDash = radionuclide.split("-").join("").toLowerCase()

      const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: radionuclideNoDash }) : await invoke('ingestion_types', { radionuclide: radionuclideNoDash });
      const absorptionTypes = types.split("-");
      setAbsorptionTypes(absorptionTypes);
      const newTables: InputData[] = [];
      for (let i = 0; i < absorptionTypes.length; i++) {
        const newTable: InputData = await invoke(`coefficients`, { intakeMethod: (intakeMethod == 'inh') ? 'inhalation' : 'ingestion', radionuclide: radionuclideNoDash, absorptionType: absorptionTypes[i], cancer: cancer });
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
            <div className="mt-20" key={i}>
              {(absorptionTypes[i] !== 'n') && <h2 className="text-center font-bold text-xl dark:text-white">Absorption Type: {absorptionTypes[i]?.toUpperCase()}</h2>}
              <table className="table-auto mx-auto text-left">
                <thead className="bg-epablue dark:bg-epagreen text-white">
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
                  {Object.entries(table).map((entries: [string, number[]], j) => {
                    return (
                      <tr className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white" key={j}>
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