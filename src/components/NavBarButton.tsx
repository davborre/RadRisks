import React from "react";

const NavBarButton = ({ icon, label, setMenu }: { icon: React.ReactNode, label: string, setMenu: React.Dispatch<React.SetStateAction<boolean[]>> }) => {

  function handleMenuChange(e: React.MouseEvent) {
    if (label == "Inputs") {
      setMenu([true, false, false, false]);
    }
    else if (label == "History") {
      setMenu([false, true, false, false]);
    }
    else if (label == "Data") {
      setMenu([false, false, true, false]);
    }
    else if (label == "Settings") {
      setMenu([false, false, false, true]);
    }
  }

  return (
    <div onClick={handleMenuChange} className="relative flex items-center justify-center w-20 h-20 hover:bg-epalightblue">
      {icon}
      <div className="absolute bottom-0 left-50 text-epablue text-xs">
        {label}
      </div>
    </div>
  );
};

export default NavBarButton;