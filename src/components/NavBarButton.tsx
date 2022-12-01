import React from "react";

const NavBarButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <div className="relative flex items-center justify-center w-20 h-20 hover:bg-epalightblue">
      {icon}
      <div className="absolute bottom-0 left-50 text-epablue text-xs">
        {label}
      </div>
    </div>
  );
};

export default NavBarButton;