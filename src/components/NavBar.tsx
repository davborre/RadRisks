import NavBarButton from "./NavBarButton";
import { BarChart, BookOpen, FileText, Info, Settings } from "react-feather";
import React from "react";

const NavBar = ({ setMenu }: { setMenu: React.Dispatch<React.SetStateAction<boolean[]>> }) => {

  return (
    <div className="h-screen w-20 flex flex-col">
      <div className="h-fit flex flex-col">
        <NavBarButton setMenu={setMenu} icon={<BarChart size="50" color="#0E6CB6" strokeWidth="1px" />} label="Inputs" />
        <NavBarButton setMenu={setMenu} icon={<BookOpen size="50" color="#0E6CB6" strokeWidth="1px" />} label="History" />
        <NavBarButton setMenu={setMenu} icon={<FileText size="50" color="#0E6CB6" strokeWidth="1px" />} label="Data" />
      </div>
      <div className="grow flex flex-col-reverse">
        <NavBarButton setMenu={setMenu} icon={<Info size="50" color="#0E6CB6" strokeWidth="1px" />} label="Info" />
        <NavBarButton setMenu={setMenu} icon={<Settings size="50" color="#0E6CB6" strokeWidth="1px" />} label="Settings" />
      </div>
    </div>
  );
};

export default NavBar;