import NavBarButton from "./NavBarButton";
import { BarChart, BookOpen, FileText, Info, Settings } from "react-feather";

const NavBar = () => {
  return (
    <div className="h-screen w-20 flex flex-col">
      <div className="h-fit flex flex-col">
        <NavBarButton icon={<BarChart size="50" color="#0E6CB6" strokeWidth="1px" />} />
        <NavBarButton icon={<BookOpen size="50" color="#0E6CB6" strokeWidth="1px" />} />
        <NavBarButton icon={<FileText size="50" color="#0E6CB6" strokeWidth="1px" />} />
      </div>
      <div className="grow flex flex-col-reverse">
        <NavBarButton icon={<Info size="50" color="#0E6CB6" strokeWidth="1px" />} />
        <NavBarButton icon={<Settings size="50" color="#0E6CB6" strokeWidth="1px" />} />
      </div>
    </div>
  );
};

export default NavBar;