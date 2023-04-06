import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";



function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <NavBar setOpen={setOpen} />
      <Outlet />
      <Modal isOpen={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
