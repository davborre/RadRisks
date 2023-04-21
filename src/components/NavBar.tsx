import NavBarButton from "./NavBarButton";
import { BarChart, BookOpen, FileText, Info, Settings } from "react-feather";
import React from "react";

const NavBar = ({ setOpen, darkMode }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, darkMode: boolean }) => {

  const iconColor = darkMode ? '#C9F0EE' : '#0E6CB6'

  return (
    <div className="h-screen w-20 flex flex-col overflow-auto dark:bg-gray-900">
      <div className="h-fit flex flex-col">
        <NavBarButton icon={<BarChart size="50" color={iconColor} strokeWidth="1px" />} label="Inputs" route="/" />
        <NavBarButton icon={<BookOpen size="50" color={iconColor} strokeWidth="1px" />} label="History" route="history" />
        <NavBarButton icon={<FileText size="50" color={iconColor} strokeWidth="1px" />} label="Data" route="data" />
      </div>
      <div className="grow flex flex-col-reverse">
        <div onClick={() => setOpen(true)} className="relative flex items-center justify-center w-20 h-20 hover:bg-epalightblue dark:hover:bg-epablue">
          <Info size="50" color={iconColor} strokeWidth="1px" />
          <div className="absolute bottom-0 left-50 text-epablue text-xs dark:text-epalightblue">
            Info
          </div>
        </div>
        <NavBarButton icon={<Settings size="50" color={iconColor} strokeWidth="1px" />} label="Settings" route="settings" />
      </div>
    </div>
  );
};

export default NavBar;