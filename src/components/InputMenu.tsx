import Dropdown from "./Dropdown";
import { radionuclides } from "../data/radionuclides";

const InputMenu = () => {

  return (
    <div className="h-screen w-80 bg-epasagegreen pl-2 pt-4">
      <h1 className="font-bold pb-10">Inputs</h1>
      <div className="flex flex-row gap-5">
        <h2>Radionuclides:</h2>
        <Dropdown options={radionuclides} />
      </div>
    </div>
  );
};

export default InputMenu;