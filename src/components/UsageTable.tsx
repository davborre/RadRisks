import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { InputData, UsageDataColumn } from '../utils';

const enum UsageFunction {
  Age,
  UsageData
}

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
        {Object.entries(usage).map((entries: [string, number[]], i) => {
          return (
            <tr className="odd:bg-epalightblue dark:odd:bg-epaolivegreen dark:even:bg-white" key={i}>
              <td> {entries[UsageFunction.Age]} </td>
              <td> {entries[UsageFunction.UsageData][UsageDataColumn.MaleInhalation].toExponential(3)} </td>
              <td> {entries[UsageFunction.UsageData][UsageDataColumn.FemaleInhalation].toExponential(3)} </td>
              <td> {entries[UsageFunction.UsageData][UsageDataColumn.MaleTapwater].toExponential(3)} </td>
              <td> {entries[UsageFunction.UsageData][UsageDataColumn.FemaleTapwater].toExponential(3)} </td>
              <td> {entries[UsageFunction.UsageData][UsageDataColumn.MaleDietary].toExponential(3)} </td>
              <td> {entries[UsageFunction.UsageData][UsageDataColumn.FemaleDietary].toExponential(3)} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default UsageTable