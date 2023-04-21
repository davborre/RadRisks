import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";

const SettingsMenu = () => {
  const [fileType, setFileType] = useState<string | null>(null);
  const fileTypes = ["pdf", "txt"];

  useEffect(() => {
    (async () => {
      const settings = new Store('.settings.dat');
      console.log(await settings.entries());
      const fileType = await settings.get('fileType') as string;
      setFileType(fileType);
    })();
  }, [])

  useEffect(() => {
    if (fileType == null) {
      return;
    }

    (async () => {
      const settings = new Store('.settings.dat');
      await settings.set('fileType', fileType);
      await settings.save();
    })();
  }, [fileType])

  return (
    <div className="h-screen w-80 bg-epasagegreen px-2 pt-4 flex flex-col gap-10">
      <h1 className="font-bold">Settings</h1>
      {/*
        <div>
          <label>Output File Directory:
            <input className="w-full" type="text" />
          </label>
        </div>
        */
      }
      <div>
        <label>Output File Type:{' '}
          <Dropdown options={fileTypes} width={75} value={fileType} setValue={setFileType} />
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
    </div>
  );
};

export default SettingsMenu;