import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'

const RiskCoefficientsTable = ({ radionuclide, cancer, intakeMethod }: { radionuclide: string, cancer: string, intakeMethod: string }) => {
  const [tables, setTables] = useState([]);
  const [absorptionTypes, setAbsorptionTypes] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const radionuclideNoDash = radionuclide.split("-").join("").toLowerCase()

      const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: radionuclideNoDash }) : await invoke('ingestion_types', { radionuclide: radionuclideNoDash });
      const absorptionTypes = types.split("-");
      setAbsorptionTypes(absorptionTypes);
      const newTables: any = [];
      for (let i = 0; i < absorptionTypes.length; i++) {
        const newTable = await invoke(`plugin:${intakeMethod}_${radionuclideNoDash}|${cancer}_${absorptionTypes[i]}`);
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
            <div className="mt-20">
              {(absorptionTypes[i] !== 'n') && <h2 className="text-center font-bold text-xl">Absorption Type: {absorptionTypes[i].toUpperCase()}</h2>}
              <table className="table-auto mx-auto text-left">
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