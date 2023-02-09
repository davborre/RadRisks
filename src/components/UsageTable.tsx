import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'

const DataTable = () => {
  const [usage, setUsage] = useState({});

  useEffect(() => {
    if (Object.keys(usage).length == 0) {
      invoke("usage")
        .then((res: any) => {
          setUsage(res)
        })
    }
  });

  return (
    <table className="table-auto mx-auto text-left mt-5">
      <thead className="bg-epablue text-white">
        <tr>
          <th />
          <th colSpan={2}>Inhalation</th>
          <th colSpan={2}>Tapwater Usage (L/d)</th>
          <th colSpan={2}>Dietary (kcal/d)</th>
        </tr>
        <tr>
          <th className="pr-10">Age</th>
          <th className="pr-20">Male</th>
          <th className="pr-20">Female</th>
          <th className="pr-20">Male</th>
          <th className="pr-20">Female</th>
          <th className="pr-20">Male</th>
          <th className="pr-20">Female</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(usage).map((entries: any) => {
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

export default DataTable;