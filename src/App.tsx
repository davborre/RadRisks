import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Store } from "tauri-plugin-store-api";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";

type ContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      const settings = new Store('.settings.dat');
      const darkMode = await settings.get('darkMode') as boolean;
      setDarkMode(darkMode);
    })();
  }, [])

  return (
    <div className={`flex ${darkMode ? 'dark' : ''}`}>
      <NavBar setOpen={setOpen} darkMode={darkMode} />
      <Outlet context={[darkMode, setDarkMode]} />
      <Modal isOpen={open} setOpen={setOpen} />
    </div>
  );
}

export function useDarkMode() {
  return useOutletContext<ContextType>();
}

export default App;
