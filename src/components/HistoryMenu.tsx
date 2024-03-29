import { ChevronDown } from "react-feather";
import { save } from "@tauri-apps/api/dialog";
import { writeBinaryFile, writeTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";
import MenuDescription from "./MenuDescription";
import { formatTextContent, OutputData, Calculation } from "../utils";
import jsPDF from "jspdf";

const historyDescription = 'Select a radionuclide to expand a list of previous calculations. Select a calculation to display its data.'

const HistoryMenu = ({ setCalculation, txtTables }: { setCalculation: React.Dispatch<React.SetStateAction<Calculation | {}>>, txtTables: OutputData[] }) => {
  const [history, setHistory] = useState<{ [index: string]: string[] } | null>(null)
  const [selectedRadionuclide, setSelectedRadionuclide] = useState('');
  const [selectedCalculation, setSelectedCalculation] = useState('');
  const [calculationOnScreen, setCalculationOnScreen] = useState<Calculation | null>(null);

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
        autoPaging: 'text',
        x: 20,
        width: 170,
        windowWidth: 900,
      });
    }
    else if (fileType == 'txt') {
      const content = await formatTextContent(txtTables, calculationOnScreen as Calculation);
      await writeTextFile(path, content);
    }
  }

  function handleSelect(radionuclide: string, entry: string) {
    const inputs = entry.split("; ");
    const ageRanges = inputs[0].split(", ");
    const intakeMethod = inputs[1];

    const startingAges = [];
    const exposureLengthYears = [];
    const exposureLengthDays = [];

    for (let i = 0; i < ageRanges.length; i++) {
      const splitString = ageRanges[i].split(' ');
      const ageRange = splitString[0].split('-').map(Number);
      startingAges.push(ageRange[0]);
      exposureLengthYears.push(ageRange[1] - ageRange[0]);
      exposureLengthDays.push(Number(splitString[3]));
    }

    const formattedRadionuclide = radionuclide.split("-").join("").toLowerCase();
    const form = { "radionuclide": radionuclide, "formattedRadionuclide": formattedRadionuclide, "intakeMethod": intakeMethod.toLowerCase().substring(0, 3), "age": startingAges, "exposureLengthYears": exposureLengthYears, "exposureLengthDays": exposureLengthDays }
    console.log(form);
    setCalculation(form);
    setCalculationOnScreen(form);
    setSelectedRadionuclide(radionuclide);
    setSelectedCalculation(entry);
  }

  useEffect(() => {
    (async () => {
      const storedHistory = new Store('.history.dat');
      const keys = (await storedHistory.keys()).sort()

      const newHistory: { [index: string]: string[] } = {}
      for (let i = 0; i < keys.length; i++) {
        newHistory[keys[i]] = (await storedHistory.get(keys[i]) as string[]).sort();
      }

      setHistory(newHistory);
    })();
  }, [])

  return (
    <div className="h-screen w-80 bg-epasagegreen dark:bg-blackolive dark:text-white pt-4 gap-5 flex flex-col relative">
      <h1 className="font-bold pl-2">History</h1>
      <MenuDescription description={historyDescription} />
      <div className="overflow-auto">
        {history && Object.entries(history).map((entry, i) => {
          return (
            <details className="even:bg-epaolivegreen dark:even:bg-eerieblack p-2 select-none group cursor-default" key={i}>
              <summary className={`flex ${(entry[0] == selectedRadionuclide) ? 'font-bold' : ''}`}>
                {entry[0]}
                <ChevronDown className="ml-auto group-open:rotate-180" />
              </summary>
              <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
                {entry[1].map((subhistory: string, j: number) => {
                  return (
                    <li className={`${(entry[0] == selectedRadionuclide && subhistory == selectedCalculation) ? 'font-bold' : ''}`} key={j} onClick={() => handleSelect(entry[0], subhistory)}>{subhistory}</li>
                  )
                })}
              </ul>
            </details>
          )
        })}
      </div>
      <div className="flex absolute bottom-0 inset-x-0 pb-4">
        <button
          type="button"
          onClick={() => handleClear()}
          className="border-2 border-epablue text-epablue hover:bg-epablue hover:text-white dark:border-epagreen dark:text-epagreen dark:hover:bg-epagreen dark:hover:text-white w-fit mx-auto p-2 rounded-lg"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => handleExport()}
          className="border-2 border-epablue text-epablue hover:bg-epablue hover:text-white dark:border-epagreen dark:text-epagreen dark:hover:bg-epagreen dark:hover:text-white w-fit mx-auto p-2 rounded-lg"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default HistoryMenu;