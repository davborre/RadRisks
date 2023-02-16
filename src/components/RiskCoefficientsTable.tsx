import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'

const RiskCoefficientsTable = () => {
  const [radionuclide, setRadionuclide] = useState({});

  useEffect(() => {
    if (Object.keys(radionuclide).length == 0) {
      invoke("Ac224Sesophagus")
        .then((res: any) => {
          setRadionuclide(res)
        })
    }
  });

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
        {Object.entries(radionuclide).map((entries: any) => {
          return (
            <tr className="odd:bg-epalightblue">
              <td> {entries[0]} </td>
              <td> {entries[1][0].toExponential(3)} </td>
              <td> {entries[1][1].toExponential(3)} </td>
              <td> {entries[1][2].toExponential(3)} </td>
              <td> {entries[1][3].toExponential(3)} </td>
              <td> {entries[1][4].toExponential(3)} </td>
              <td> {entries[1][5].toExponential(3)} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default RiskCoefficientsTable;