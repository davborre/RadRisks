import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { InputData } from '../utils';

const enum SurvFunction {
  Age,
  SurvData
}

const enum SurvDataColumn {
  CombinedSurvival,
  MaleSurvival,
  FemaleSurvival,
  CombinedLifetime,
  MaleLifetime,
  FemaleLifetime,
  CombinedRatio
}

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
        {Object.entries(surv).map((entries: [string, number[]], i) => {
          return (
            <tr className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white" key={i}>
              <td> {entries[SurvFunction.Age]} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.CombinedSurvival].toExponential(3)} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.MaleSurvival].toExponential(3)} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.FemaleSurvival].toExponential(3)} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.CombinedLifetime].toFixed(3)} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.MaleLifetime].toFixed(3)} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.FemaleLifetime].toFixed(3)} </td>
              <td> {entries[SurvFunction.SurvData][SurvDataColumn.CombinedRatio].toFixed(3)} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default SurvTable;