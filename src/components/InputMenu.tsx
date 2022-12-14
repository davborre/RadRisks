import Dropdown from "./Dropdown";
import { radionuclides } from "../data/radionuclides";
import { ages } from "../data/ages";

const InputMenu = () => {

  const intakeMethods: string[] = ["Ingestion", "Inhalation"];
  const sexes: string[] = ["Male", "Female"];

  return (
    <div className="h-screen w-80 bg-epasagegreen pl-2 pt-4 flex flex-col gap-10">
      <h1 className="font-bold">Inputs</h1>
      <div className="flex flex-row">
        <label>Radionuclides:{' '}
          <Dropdown options={radionuclides} />
        </label>
      </div>
      <div className="flex flex-row gap-5">
        <label className="grow">Intake method:{' '}
          <Dropdown options={intakeMethods} />
        </label>
      </div>
      <div className="flex flex-row gap-5">
        <label>Age at exposure:{' '}
          <Dropdown options={ages} />
        </label>
      </div>
      <div className="flex flex-row gap-5">
        <label>Length of exposure:{' '}
          <Dropdown options={ages} />
        </label>
      </div>
      <div className="flex flex-row gap-5">
        <label>Sex:{' '}
          <Dropdown options={sexes} />
        </label>
      </div>
    </div>
  );
};

export default InputMenu;