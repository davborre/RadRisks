import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'

const RiskCoefficientsTable = ({ radionuclide, cancer }: { radionuclide: string, cancer: string }) => {
  const [table, setTable] = useState({});

  useEffect(() => {
    invoke(`plugin:inh_${radionuclide}|${cancer}_s`)
      .then((res: any) => {
        setTable(res)
      })
  }, [radionuclide, cancer]);

  return (
    <table className="table-auto mx-auto text-left mt-5">
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
  )
}

export default RiskCoefficientsTable;