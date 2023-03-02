import Dropdown from "./Dropdown";
import { radionuclides } from "../data/radionuclides";
import { ages } from "../data/ages";
import { useState } from "react";
import ComboBox from "./ComboBox";

const InputMenu = ({ setCalculation, setTable }: { setCalculation: React.Dispatch<React.SetStateAction<Object>>, setTable: React.Dispatch<React.SetStateAction<number>> }) => {

  const [radionuclide, setRadionuclide] = useState<string | null>(null);
  const [intakeMethod, setIntakeMethod] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [exposureLength, setExposureLength] = useState<string | null>(null);
  const [fractionalExposure, setFractionalExposure] = useState<string | null>(null);
  const [sex, setSex] = useState<string | null>(null);
  const intakeMethods: string[] = ["Ingestion", "Inhalation"];
  const sexes: string[] = ["Male", "Female", "Both"];

  function handleSubmit() {
    const formattedRadionuclide = radionuclide?.split("-").join("").toLowerCase();
    const form = { "radionuclide": formattedRadionuclide, "intakeMethod": intakeMethod?.toLowerCase().substring(0, 3), "age": Number(age), "exposureLength": Number(exposureLength), "sex": sex }
    console.log(form);
    setCalculation(form);
    setTable(0);
  }

  const slicedAges = ages.slice(0, -Number(age));
  const days = Array.from(Array(366).keys()).slice(1).map(String);

  return (
    <div className="h-screen w-80 bg-epasagegreen px-2 pt-4 flex flex-col gap-10">
      <h1 className="font-bold">Inputs</h1>
      <div>
        <label>Radionuclides:{' '}
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
      <div>
        <label>Sex:{' '}
          <Dropdown options={sexes} width={75} value={sex} setValue={setSex} />
        </label>
      </div>
      {/*
      <div>
        <label>Sex:{' '}
          <ComboBox options={sexes} />
        </label>
      </div>
      */}
      <button
        type="button"
        onClick={() => handleSubmit()}
        className="border-2 border-epablue text-epablue w-fit mx-auto p-2 rounded-lg hover:bg-epablue hover:text-white"
      >
        Calculate
      </button>
    </div>
  );
};

export default InputMenu;