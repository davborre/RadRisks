import React, { useState } from "react";
import NavBar from "./components/NavBar";
import InputMenu from "./components/InputMenu";
import HistoryMenu from "./components/HistoryMenu";
import DataMenu from "./components/DataMenu";
import SettingsMenu from "./components/SettingsMenu";


function App() {
  const [menu, setMenu] = useState([true, false, false, false]);

  return (
    <div className="flex">
      <NavBar setMenu={setMenu} />
      {menu[0] && <InputMenu />}
      {menu[1] && <HistoryMenu />}
      {menu[2] && <DataMenu />}
      {menu[3] && <SettingsMenu />}
    </div>
  );
}

export default App;
