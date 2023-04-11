import { ChevronDown } from "react-feather";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile, writeTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";
import jsPDF from "jspdf";

function formatTextContent(txtTables: Object[]): string {
  let text = "";

  for (let i = 0; i < txtTables.length; i++) {
    text += `
            --------Mortality (/Bq)--------   -------Morbidity (/Bq)------- 
 Cancer     Male        Female         Both   Male        Female        Both
 ---------------------------------------------------------------------------\n`;

    Object.entries(txtTables[i]).map((entries) => {
      text += ` ${entries[0]}${' '.repeat(12 - entries[0].length)}${entries[1].map((entry: number) => String(entry.toExponential(2)) + ' '.repeat(8 - String(entry.toExponential(2)).length)).join('   ')}\n`
    })
  }

  return text;
}

const HistoryMenu = ({ setCalculation, txtTables }: { setCalculation: React.Dispatch<React.SetStateAction<any>>, txtTables: any }) => {
  const [history, setHistory] = useState<Object | null>(null)
  const [selectedRadionuclide, setSelectedRadionuclide] = useState('');
  const [selectedCalculation, setSelectedCalculation] = useState('');

  async function handleClear() {
    const storedHistory = new Store('.history.dat');
    await storedHistory.clear();
    await storedHistory.save();
    setHistory(null);
  }

  async function handleExport() {
    const settings = new Store('.settings.dat');
    const fileType = await settings.get('fileType') as string;

    const path = await save({
      filters: [{
        name: fileType,
        extensions: [fileType],
      }]
    });

    if (!path) {
      return;
    }

    if (fileType == 'pdf') {
      const input = document.getElementById("tables");
      console.log(input);

      if (!input) {
        return;
      }

      const doc = new jsPDF();

      doc.html(input, {
        callback: async function (doc) {
          await writeBinaryFile(path, doc.output('arraybuffer'));
        },
        x: 20,
        width: 170,
        windowWidth: 900,
      });
    }
    else if (fileType == 'txt') {
      const content = formatTextContent(txtTables);
      await writeTextFile(path, content);
    }
  }

  function handleSelect(radionuclide: string, entry: string) {
    const inputs = entry.split(", ");
    const age = inputs[0];
    const exposureLength = inputs[1].split(" ");
    const exposureLengthYears = exposureLength[0];
    const exposureLengthDays = exposureLength[2];
    const intakeMethod = inputs[2];

    const formattedRadionuclide = radionuclide.split("-").join("").toLowerCase();
    const form = { "radionuclide": radionuclide, "formattedRadionuclide": formattedRadionuclide, "intakeMethod": intakeMethod.toLowerCase().substring(0, 3), "age": Number(age), "exposureLengthYears": Number(exposureLengthYears), "exposureLengthDays": Number(exposureLengthDays) }
    console.log(form);
    setCalculation(form);
    setSelectedRadionuclide(radionuclide);
    setSelectedCalculation(entry);
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
            <summary className={`flex ${(entry[0] == selectedRadionuclide) ? 'font-bold' : ''}`}>
              {entry[0]}
              <ChevronDown className="ml-auto group-open:rotate-180" />
            </summary>
            <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
              {entry[1].map((subhistory: string) => {
                return (
                  <li className={`${(entry[0] == selectedRadionuclide && subhistory == selectedCalculation) ? 'font-bold' : ''}`} onClick={() => handleSelect(entry[0], subhistory)}>{subhistory}</li>
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