import React from "react";
import { NavLink } from "react-router-dom";

const NavBarButton = ({ icon, label, route }: { icon: React.ReactNode, label: string, route: string }) => {

  return (
    <NavLink to={route}
      className={({ isActive, isPending }) => isActive ? 'active bg-epalightblue dark:bg-epablue font-bold' : isPending ? 'pending bg-epalightblue dark:bg-epablue font-bold' : ''}
    >
      <div className="relative flex items-center justify-center w-20 h-20 hover:bg-epalightblue dark:hover:bg-epablue">
        {icon}
        <div className="absolute bottom-0 left-50 text-epablue dark:text-epalightblue text-xs">
          {label}
        </div>
      </div>
    </NavLink>
  );
};

export default NavBarButton;