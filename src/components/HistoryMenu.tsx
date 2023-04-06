import { ChevronDown } from "react-feather";
import { save } from "@tauri-apps/api/dialog";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";


const HistoryMenu = ({ setCalculation, txtTables }: { setCalculation: React.Dispatch<React.SetStateAction<any>>, txtTables: any }) => {
  const [history, setHistory] = useState<Object | null>(null)

  async function handleClear() {
    const storedHistory = new Store('.history.dat');
    await storedHistory.clear();
    await storedHistory.save();
    setHistory(null);
  }

  async function handleExport() {
    const savePath = await save();
    console.log(savePath);
  }

  function handleSelect(radionuclide: string, entry: string) {
    const inputs = entry.split(", ");
    const age = inputs[0];
    const exposureLength = inputs[1][0];
    const intakeMethod = inputs[2];

    const formattedRadionuclide = radionuclide.split("-").join("").toLowerCase();
    const form = { "radionuclide": formattedRadionuclide, "intakeMethod": intakeMethod.toLowerCase().substring(0, 3), "age": Number(age), "exposureLength": Number(exposureLength) }
    console.log(form);
    setCalculation(form);
  }

  useEffect(() => {
    (async () => {
      const storedHistory = new Store('.history.dat');
      const keys = (await storedHistory.keys()).sort()

      const newHistory: any = {}
      for (let i = 0; i < keys.length; i++) {
        newHistory[keys[i]] = (await storedHistory.get(keys[i]) as string[]).sort();
      }

      setHistory(newHistory);
    })();
  }, [])

  return (
    <div className="h-screen w-80 bg-epasagegreen pt-4 flex flex-col overflow-auto relative">
      <h1 className="font-bold pl-2 mb-8">History</h1>
      {history && Object.entries(history).map((entry, i) => {
        return (
          <details className="even:bg-epaolivegreen p-2 select-none group">
            <summary className="flex">
              {entry[0]}
              <ChevronDown className="ml-auto group-open:rotate-180" />
            </summary>
            <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
              {entry[1].map((subhistory: string) => {
                return (
                  <li onClick={() => handleSelect(entry[0], subhistory)}>{subhistory}</li>
                )
              })}
            </ul>
          </details>
        )
      })}
      <div className="flex absolute bottom-0 inset-x-0 pb-4">
        <button
          type="button"
          onClick={() => handleClear()}
          className="border-2 border-epablue text-epablue w-fit mx-auto p-2 rounded-lg hover:bg-epablue hover:text-white"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => handleExport()}
          className="border-2 border-epablue text-epablue w-fit mx-auto p-2 rounded-lg hover:bg-epablue hover:text-white"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default HistoryMenu;