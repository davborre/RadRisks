import Dropdown from "./Dropdown";
import ComboBox from "./ComboBox";
import MenuDescription from "./MenuDescription";
import { radionuclides } from "../data/radionuclides";
import { ages } from "../data/ages";
import { useState, useEffect } from "react";
import { Plus, Minus } from "react-feather";
import { writeBinaryFile, writeTextFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import { Store } from "tauri-plugin-store-api";
import { invoke } from '@tauri-apps/api/tauri';
import jsPDF from "jspdf";

async function formatTextContent(txtTables: Object[], lastCalculation: any): Promise<string> {
  const { radionuclide, formattedRadionuclide, age, exposureLengthYears, exposureLengthDays, intakeMethod } = lastCalculation;

  const agePlusExposure = age.map((a: number, i: number) => a + exposureLengthYears[i]);
  const exposedString = `${radionuclide}, Exposed Ages: ${age.map((a: number, i: number) => `${age[i]}-${agePlusExposure[i]} Years and ${exposureLengthDays[i]} Days`).join(', ')}`;

  let text = ' '.repeat(24) + ((intakeMethod == 'inh') ? 'Inhalation' : 'Ingestion');
  text += ' Risk Coefficients\n'
  text += ' '.repeat((75 - exposedString.length) / 2) + `${exposedString}\n`;

  const types: string = (intakeMethod == "inh") ? await invoke('inhalation_types', { radionuclide: formattedRadionuclide }) : await invoke('ingestion_types', { radionuclide: formattedRadionuclide })
  const absorptionTypes = (intakeMethod == 'ing') ? types.split("-").concat(types.split("-")) : types.split("-");

  console.log(absorptionTypes)

  for (let i = 0; i < txtTables.length; i++) {
    text += `
                             Absorption Type: ${(intakeMethod == 'ing' && i < absorptionTypes.length / 2) ? 'Drinking Water' : (intakeMethod == 'ing') ? 'Diet' : ''}${(absorptionTypes[i] !== 'n' && intakeMethod == 'inh') ? absorptionTypes[i].toUpperCase() : (absorptionTypes[i] !== 'n' && intakeMethod == 'ing') ? ' (' + absorptionTypes[i].toUpperCase() + ')' : ''}
            --------Mortality (/Bq)--------   -------Morbidity (/Bq)------- 
 Cancer     Male        Female         Both   Male        Female        Both
 ---------------------------------------------------------------------------\n`;

    Object.entries(txtTables[i]).map((entries) => {
      text += ` ${entries[0]}${' '.repeat(12 - entries[0].length)}${entries[1].map((entry: number) => String(entry.toExponential(2)) + ' '.repeat(8 - String(entry.toExponential(2)).length)).join('   ')}\n`
    })
  }

  return text;
}

const intakeMethods: string[] = ["Ingestion", "Inhalation"];
const days = Array.from(Array(365).keys()).slice().map(String);

const inputDescription = 'Enter a value in all input fields and click calculate. Change the number of age ranges with the +/-.'

const InputMenu = ({ setCalculation, txtTables }: { setCalculation: React.Dispatch<React.SetStateAction<any>>, txtTables: any }) => {
  const [radionuclide, setRadionuclide] = useState<string | null>(null);
  const [intakeMethod, setIntakeMethod] = useState<string | null>(null);
  const [age, setAge] = useState<(string | null)[]>([null]);
  const [exposureLength, setExposureLength] = useState<(string | null)[]>([null]);
  const [fractionalExposure, setFractionalExposure] = useState<(string | null)[]>([null]);
  const [lastCalculation, setLastCalculation] = useState<any>(null);
  const [fractionalExposureSetting, setFractionalExposureSetting] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const settings = new Store('.settings.dat');
      const settingFrac = await settings.get('fractionalExposure') as boolean;

      if (!settingFrac) {
        setFractionalExposure(["0"]);
      }

      setFractionalExposureSetting(settingFrac);
    })();
  }, [])

  async function handleCalculate() {
    if (!radionuclide || !intakeMethod || age.includes(null) || exposureLength.includes(null) || (fractionalExposure.includes(null) && fractionalExposureSetting)) {
      return;
    }

    const formattedRadionuclide = radionuclide.split("-").join("").toLowerCase();
    const form = { "radionuclide": radionuclide, "formattedRadionuclide": formattedRadionuclide, "intakeMethod": intakeMethod.toLowerCase().substring(0, 3), "age": age.map(Number), "exposureLengthYears": exposureLength.map(Number), "exposureLengthDays": fractionalExposure.map(Number) }
    console.log(form);
    setCalculation(form);
    setLastCalculation(form);

    const history = new Store('.history.dat');
    if (!(await history.has(radionuclide))) {
      await history.set(radionuclide, []);
    }

    const agePlusExposure: number[] = (age.map(Number)).map((a: number, i: number) => a + Number(exposureLength[i]));
    const exposedString = `${agePlusExposure.map((a: number, i: number) => `${age[i]}-${agePlusExposure[i]} Years and ${fractionalExposure[i]} Days`).join(', ')}`;

    const prevHistory = new Set(await history.get(radionuclide) as string[]);
    prevHistory.add(`${exposedString}; ${intakeMethod}`);
    history.set(radionuclide, Array.from(prevHistory));
    await history.save();

    console.log(await history.entries());
  }

  async function handleExport() {
    if (lastCalculation == null) {
      return;
    }

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
      const content = await formatTextContent(txtTables, lastCalculation);
      await writeTextFile(path, content);
    }
  }

  function handleDropdownChange(dropdown: string, value: string | null, index: number) {
    if (dropdown == 'radionuclide') {
      setRadionuclide(value);
    } else if (dropdown == 'intake') {
      setIntakeMethod(value);
    } else if (dropdown == 'age') {
      const nextAge = age.map((a, i) => {
        if (i === index) {
          return value;
        } else {
          return a;
        }
      });
      setAge(nextAge);
    } else if (dropdown == 'exposureLength') {
      const nextExposure = exposureLength.map((e, i) => {
        if (i === index) {
          return value;
        } else {
          return e;
        }
      });
      setExposureLength(nextExposure);
    } else if (dropdown == 'fractionalExposure') {
      const nextFrac = age.map((f, i) => {
        if (i === index) {
          return value;
        } else {
          return f;
        }
      });
      setFractionalExposure(nextFrac);
    }
  }

  function parsedAges(i: number) {
    return (i == 0) ? ages : (age[i - 1] == null) ? [] : ages.slice(Number(age[i - 1]) + Number(exposureLength[i - 1]) + 1);
  }

  function slicedAges(i: number) {
    return (age[i] == "0") ? ages : ages.slice(0, -Number(age[i]));
  }

  function handleAddAgeRange() {
    setAge([...age, null]);
    setExposureLength([...exposureLength, null]);
    if (!fractionalExposureSetting) {
      setFractionalExposure([...fractionalExposure, "0"]);
    } else {
      setFractionalExposure([...fractionalExposure, null]);
    }
  }

  function handleSubtractAgeRange() {
    setAge(age.slice(0, -1));
    setExposureLength(exposureLength.slice(0, -1));
    setFractionalExposure(fractionalExposure.slice(0, -1));
  }

  return (
    <div className="h-screen w-80 bg-epasagegreen dark:bg-blackolive dark:text-white pt-4 flex flex-col gap-5 relative">
      <h1 className="font-bold px-2">Inputs</h1>
      <MenuDescription description={inputDescription} />
      <div className="grow flex flex-col gap-10 overflow-auto">
        <div className="px-2">
          <label>Radionuclide:{' '}
            <Dropdown options={radionuclides} width={100} value={radionuclide} setValue={(newValue: string | null) => handleDropdownChange('radionuclide', newValue, 0)} />
          </label>
        </div>
        <div className="px-2">
          <label className="grow">Intake method:{' '}
            <Dropdown options={intakeMethods} width={100} value={intakeMethod} setValue={(newValue: string | null) => handleDropdownChange('intake', newValue, 0)} />
          </label>
        </div>
        {Array.from(Array(age.length), (e, i) => {
          return (
            <div key={i} className="flex flex-col gap-10 odd:bg-epaolivegreen dark:odd:bg-eerieblack odd:py-10 p-2 relative">
              <div>
                <label>Age at exposure:{' '}
                  <Dropdown options={parsedAges(i)} width={90} value={age[i]} setValue={(newValue: string | null) => handleDropdownChange('age', newValue, i)} />
                </label>
              </div>
              <div>
                <label className="flex gap-2">Length of exposure:{' '}
                  <div className="flex flex-col gap-2">
                    <div>
                      <Dropdown options={slicedAges(i)} width={50} value={exposureLength[i]} setValue={(newValue: string | null) => handleDropdownChange('exposureLength', newValue, i)} />
                      {' '}years
                    </div>
                    {fractionalExposureSetting &&
                      <div>
                        <Dropdown options={days} width={50} value={fractionalExposure[i]} setValue={(newValue: string | null) => handleDropdownChange('fractionalExposure', newValue, i)} />
                        {' '}days
                      </div>
                    }
                  </div>
                </label>
              </div>
              {(i == age.length - 1 && i != 0) &&
                <Minus
                  onClick={() => handleSubtractAgeRange()}
                  className="absolute bottom-10 right-2"
                />
              }
              {(i == age.length - 1) &&
                <Plus
                  onClick={() => handleAddAgeRange()}
                  className="absolute bottom-2 right-2"
                />
              }
            </div>
          )
        })}
      </div>
      <div className="flex pb-4">
        <button
          type="button"
          onClick={() => handleCalculate()}
          className="border-2 border-epablue text-epablue hover:bg-epablue hover:text-white dark:border-epagreen dark:text-epagreen dark:hover:bg-epagreen dark:hover:text-white w-fit mx-auto p-2 rounded-lg"
        >
          Calculate
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

export default InputMenu;

