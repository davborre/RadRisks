import NavBarButton from "./NavBarButton";
import { BarChart, BookOpen, FileText, Info, Settings } from "react-feather";

const NavBar = () => {

  const labels: string[] = []

  return (
    <div className="h-screen w-20 flex flex-col">
      <div className="h-fit flex flex-col">
        <NavBarButton icon={<BarChart size="50" color="#0E6CB6" strokeWidth="1px" />} label="Inputs" />
        <NavBarButton icon={<BookOpen size="50" color="#0E6CB6" strokeWidth="1px" />} label="History" />
        <NavBarButton icon={<FileText size="50" color="#0E6CB6" strokeWidth="1px" />} label="Data" />
      </div>
      <div className="grow flex flex-col-reverse">
        <NavBarButton icon={<Info size="50" color="#0E6CB6" strokeWidth="1px" />} label="Info" />
        <NavBarButton icon={<Settings size="50" color="#0E6CB6" strokeWidth="1px" />} label="Settings" />
      </div>
    </div>
  );
};

export default NavBar;