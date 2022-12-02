import Dropdown from "./Dropdown";
import { radionuclides } from "../data/radionuclides";
import { ages } from "../data/ages";

const InputMenu = () => {

  const intakeMethods: string[] = ["Ingestion", "Inhalation"];
  const sexes: string[] = ["Male", "Female"];

  return (
    <div className="h-screen w-80 bg-epasagegreen pl-2 pt-4 flex flex-col gap-10">
      <h1 className="font-bold">Inputs</h1>
      <div className="flex flex-row gap-5">
        <h2>Radionuclides:</h2>
        <Dropdown options={radionuclides} />
      </div>
      <div className="flex flex-row gap-5">
        <h2>Intake method:</h2>
        <Dropdown options={intakeMethods} />
      </div>
      <div className="flex flex-row gap-5">
        <h2>Age at exposure:</h2>
        <Dropdown options={ages} />
      </div>
      <div className="flex flex-row gap-5">
        <h2>Length of exposure:</h2>
        <Dropdown options={ages} />
      </div>
      <div className="flex flex-row gap-5">
        <h2>Sex:</h2>
        <Dropdown options={sexes} />
      </div>
    </div>
  );
};

export default InputMenu;