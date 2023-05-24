import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { InputData } from '../utils';

const UsageTable = () => {
  const [usage, setUsage] = useState<InputData | {}>({});

  useEffect(() => {
    (async () => {
      const usageData: InputData = await invoke("usage");
      setUsage(usageData);
    })();
  }, []);

  return (
    <table className="table-auto mx-auto text-left mt-5">
      <thead className="bg-epablue dark:bg-epagreen text-white">
        <tr>
          <th />
          <th colSpan={2}>Inhalation (m3/d)</th>
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
        {Object.entries(usage).map((entries: [string, number[]]) => {
          return (
            <tr className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white">
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

export default UsageTable