import { useState } from "react";
import NavBar from "./components/NavBar";
import InputMenu from "./components/InputMenu";
import HistoryMenu from "./components/HistoryMenu";
import DataMenu from "./components/DataMenu";
import SettingsMenu from "./components/SettingsMenu";
import Modal from "./components/Modal";
import UsageTable from "./components/UsageTable";


function App() {
  const [menu, setMenu] = useState([true, false, false, false, false]);
  const [table, setTable] = useState(-1);

  return (
    <div className="flex">
      <NavBar setMenu={setMenu} />
      {menu[0] && <InputMenu />}
      {menu[1] && <HistoryMenu />}
      {menu[2] && <DataMenu setTable={setTable} />}
      {menu[3] && <SettingsMenu />}
      {menu[2] && table == 0 &&
        <div className="grow p-20 h-screen overflow-auto">
          <h1 className="text-center font-bold text-2xl"> Usage Function </h1>
          <UsageTable />
        </div>
      }
      <Modal isOpen={menu[4]} setIsOpen={setMenu} />
    </div>
  );
}

export default App;
