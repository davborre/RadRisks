import React from "react";

const NavBarButton = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center w-20 h-20 hover:bg-epalightblue">
      {icon}
    </div>
  );
};

export default NavBarButton;