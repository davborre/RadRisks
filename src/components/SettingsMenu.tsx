import Dropdown from "./Dropdown";
import MenuDescription from "./MenuDescription";
import { useEffect, useState } from "react";
import { useDarkMode } from "../App";
import { Store } from "tauri-plugin-store-api";

const settingsDescription = 'Customize RadRisks to your preference.'

const SettingsMenu = () => {
  const [fileType, setFileType] = useState<string | null>(null);
  const [fractionalExposure, setFractionalExposure] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useDarkMode();
  const fileTypes = ["pdf", "txt"];

  useEffect(() => {
    (async () => {
      const settings = new Store('.settings.dat');
      console.log(await settings.entries());
      const fileType = await settings.get('fileType') as string;
      const fractionalExposure = await settings.get('fractionalExposure') as boolean;
      const darkMode = await settings.get('darkMode') as boolean;
      setFileType(fileType);
      setFractionalExposure(fractionalExposure);
      setDarkMode(darkMode);
    })();
  }, []);

  useEffect(() => {
    if (fileType == null) {
      return;
    }

    (async () => {
      const settings = new Store('.settings.dat');
      await settings.set('fileType', fileType);
      await settings.save();
    })();
  }, [fileType]);

  async function handleCheckbox(setting: string, checked: boolean) {
    const settings = new Store('.settings.dat');

    if (setting == 'fractionalExposure') {
      setFractionalExposure(checked);
    } else if (setting == 'darkMode') {
      setDarkMode(checked);
    }

    await settings.set(setting, checked);
    await settings.save();
  }

  return (
    <div className="h-screen w-80 bg-epasagegreen dark:bg-blackolive dark:text-white pt-4 flex flex-col gap-5">
      <h1 className="font-bold px-2">Settings</h1>
      <MenuDescription description={settingsDescription} />
      {/*
        <div>
          <label>Output File Directory:
            <input className="w-full" type="text" />
          </label>
        </div>
        */
      }
      <div className="flex flex-col gap-10 px-2">
        <div>
          <label>Output File Type:{' '}
            <Dropdown options={fileTypes} width={75} value={fileType} setValue={setFileType} />
          </label>
        </div>
        <div>
          <label>Fractional Exposure:
            <input className="scale-150 ml-2 accent-epablue dark:accent-epagreen" type="checkbox" checked={fractionalExposure} onChange={e => handleCheckbox('fractionalExposure', e.target.checked)} />
          </label>
        </div>
        <div>
          <label>Dark Mode:
            <input className="scale-150 ml-2 accent-epablue dark:accent-epagreen" type="checkbox" checked={darkMode} onChange={e => handleCheckbox('darkMode', e.target.checked)} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;