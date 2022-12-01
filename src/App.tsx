import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import NavBar from "./components/NavBar";
import InputMenu from "./components/InputMenu";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="flex">
      <NavBar />
      <InputMenu />
    </div>
  );
}

export default App;
