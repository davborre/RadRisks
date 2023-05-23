import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { InputData } from '../utils';

const SurvTable = () => {
  const [surv, setSurv] = useState<InputData | {}>({});

  useEffect(() => {
    (async () => {
      const survData: InputData = await invoke("survival");
      setSurv(survData);
    })();
  }, []);

  return (
    <table className="table-auto mx-auto text-left mt-5">
      <thead className="bg-epablue dark:bg-epagreen text-white">
        <tr>
          <th />
          <th colSpan={3}>Extrapolated Survival</th>
          <th colSpan={3}>Average Remaining Lifetime</th>
          <th>M:F Ratio</th>
        </tr>
        <tr>
          <th className="pr-10">Age</th>
          <th className="pr-10">Combined</th>
          <th className="pr-20">Male</th>
          <th className="pr-10">Female</th>
          <th className="pr-10">Combined</th>
          <th className="pr-20">Male</th>
          <th className="pr-10">Female</th>
          <th className="pr-10">Combined</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(surv).map((entries: any) => {
          return (
            <tr className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white">
              <td> {entries[0]} </td>
              <td> {entries[1][0].toExponential(3)} </td>
              <td> {entries[1][1].toExponential(3)} </td>
              <td> {entries[1][2].toExponential(3)} </td>
              <td> {entries[1][3].toFixed(3)} </td>
              <td> {entries[1][4].toFixed(3)} </td>
              <td> {entries[1][5].toFixed(3)} </td>
              <td> {entries[1][6].toFixed(3)} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default SurvTable;