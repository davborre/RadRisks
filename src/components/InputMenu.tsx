import Dropdown from "./Dropdown";
import { radionuclides } from "../data/radionuclides";
import { ages } from "../data/ages";
import { useState } from "react";
import ComboBox from "./ComboBox";

const InputMenu = () => {

  const [age, setAge] = useState(0);
  const intakeMethods: string[] = ["Ingestion", "Inhalation"];
  const sexes: string[] = ["Male", "Female"];

  return (
    <div className="h-screen w-80 bg-epasagegreen px-2 pt-4 flex flex-col gap-10">
      <h1 className="font-bold">Inputs</h1>
      <div>
        <label>Radionuclides:{' '}
          <Dropdown options={radionuclides} width={100} />
        </label>
      </div>
      <div>
        <label className="grow">Intake method:{' '}
          <Dropdown options={intakeMethods} width={100} />
        </label>
      </div>
      <div>
        <label>Age at exposure:{' '}
          <Dropdown options={ages} width={90} />
        </label>
      </div>
      <div>
        <label className="flex gap-2">Length of exposure:{' '}
          <div className="flex flex-col gap-2">
            <div>
              <Dropdown options={ages.slice(1)} width={50} />
              {' '}years
            </div>
            <div>
              <Dropdown options={ages} width={50} />
              {' '}days
            </div>
          </div>
        </label>
      </div>
      <div>
        <label>Sex:{' '}
          <Dropdown options={sexes} width={75} />
        </label>
      </div>
      {/*
      <div>
        <label>Sex:{' '}
          <ComboBox options={sexes} />
        </label>
      </div>
      */}
      <button type="button" className="border-2 border-epablue text-epablue w-fit mx-auto p-2 rounded-lg hover:bg-epablue hover:text-white">Calculate</button>
    </div>
  );
};

export default InputMenu;