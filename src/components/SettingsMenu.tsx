import Dropdown from "./Dropdown";

const SettingsMenu = () => {

  const fileTypes = ["pdf", "txt"]

  return (
    <div className="h-screen w-80 bg-epasagegreen px-2 pt-4 flex flex-col gap-10">
      <h1 className="font-bold">Inputs</h1>
      <div>
        <label>Output File Directory:
          <input className="w-full" type="text" />
        </label>
      </div>
      <div>
        <label>Output File Type:{' '}
          <Dropdown options={fileTypes} width={75} />
        </label>
      </div>
      <div>
        <label>Fractional Exposure:
          <input className="scale-150 ml-2 accent-epablue" type="checkbox" />
        </label>
      </div>
      <div>
        <label>Dark Mode:
          <input className="scale-150 ml-2 accent-epablue" type="checkbox" />
        </label>
      </div>
      <button type="button" className="border-2 border-epablue text-epablue w-fit mx-auto p-2 rounded-lg hover:bg-epablue hover:text-white">Save</button>
    </div>
  );
};

export default SettingsMenu;