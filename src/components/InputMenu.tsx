import Dropdown from "./Dropdown";
import { radionuclides } from "../data/radionuclides";
import { ages } from "../data/ages";
import { useState } from "react";
import { writeBinaryFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import ComboBox from "./ComboBox";
import jsPDF from "jspdf";

const InputMenu = ({ setCalculation, setTable }: { setCalculation: React.Dispatch<React.SetStateAction<Object>>, setTable: React.Dispatch<React.SetStateAction<number>> }) => {

  const [radionuclide, setRadionuclide] = useState<string | null>(null);
  const [intakeMethod, setIntakeMethod] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [exposureLength, setExposureLength] = useState<string | null>(null);
  const [fractionalExposure, setFractionalExposure] = useState<string | null>(null);
  const intakeMethods: string[] = ["Ingestion", "Inhalation"];

  function handleCalculate() {
    const formattedRadionuclide = radionuclide?.split("-").join("").toLowerCase();
    const form = { "radionuclide": formattedRadionuclide, "intakeMethod": intakeMethod?.toLowerCase().substring(0, 3), "age": Number(age), "exposureLength": Number(exposureLength) }
    console.log(form);
    setCalculation(form);
    setTable(0);
  }

  async function handleExport() {
    const path = await save({
      filters: [{
        name: 'pdf',
        extensions: ['pdf'],
      }]
    });

    if (!path) {
      return;
    }

    const doc = new jsPDF();

    const input = document.getElementById("tables");

    if (!input) {
      return;
    }

    doc.html(input, {
      callback: async function (doc) {
        await writeBinaryFile(path, doc.output('arraybuffer'));
      },
      x: 20,
      width: 170,
      windowWidth: 900,
    });

  }

  const slicedAges = (age == "0") ? ages : ages.slice(0, -Number(age));
  const days = Array.from(Array(366).keys()).slice(1).map(String);

  return (
    <div className="h-screen w-80 bg-epasagegreen px-2 pt-4 flex flex-col gap-10 relative">
      <h1 className="font-bold">Inputs</h1>
      <div>
        <label>Radionuclide:{' '}
          <Dropdown options={radionuclides} width={100} value={radionuclide} setValue={setRadionuclide} />
        </label>
      </div>
      <div>
        <label className="grow">Intake method:{' '}
          <Dropdown options={intakeMethods} width={100} value={intakeMethod} setValue={setIntakeMethod} />
        </label>
      </div>
      <div>
        <label>Age at exposure:{' '}
          <Dropdown options={ages} width={90} value={age} setValue={setAge} />
        </label>
      </div>
      <div>
        <label className="flex gap-2">Length of exposure:{' '}
          <div className="flex flex-col gap-2">
            <div>
              <Dropdown options={slicedAges} width={50} value={exposureLength} setValue={setExposureLength} />
              {' '}years
            </div>
            <div>
              <Dropdown options={days} width={50} value={fractionalExposure} setValue={setFractionalExposure} />
              {' '}days
            </div>
          </div>
        </label>
      </div>
      <div className="flex absolute bottom-0 inset-x-0 pb-4">
        <button
          type="button"
          onClick={() => handleCalculate()}
          className="border-2 border-epablue text-epablue w-fit mx-auto p-2 rounded-lg hover:bg-epablue hover:text-white"
        >
          Calculate
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

export default InputMenu;

