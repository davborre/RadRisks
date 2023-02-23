import { ChevronDown } from "react-feather";
import { radionuclides } from "../data/radionuclides";

const DataMenu = ({ setTable, setRadionuclide, setCancer }: { setTable: React.Dispatch<React.SetStateAction<number>>, setRadionuclide: React.Dispatch<React.SetStateAction<string>>, setCancer: React.Dispatch<React.SetStateAction<string>> }) => {

  function handleClick(radionuclide: string, cancer: string) {
    const radionuclideNoDash = radionuclide.split("-").join("").toLowerCase()
    setTable(1);
    setRadionuclide(radionuclideNoDash);
    setCancer(cancer);
  }

  return (
    <div className="h-screen w-80 bg-epasagegreen pt-4 flex flex-col overflow-auto">
      <h1 className="font-bold pl-2 mb-8">Data</h1>
      <details className="even:bg-epaolivegreen p-2 select-none group max-h-96 overflow-auto">
        <summary className="flex">
          Ingestion Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        {radionuclides.map((radionuclide: string) => {
          return (
            <details className="pl-2 pt-2 space-y-2 text-sm">
              <summary>
                {radionuclide}
              </summary>
              <ul className="pl-4">
                <li>Esophagus</li>
                <li>Stomach</li>
                <li>Colon</li>
                <li>Liver</li>
                <li>Lung</li>
                <li>Bone</li>
                <li>Skin</li>
                <li>Breast</li>
                <li>Ovary</li>
                <li>Bladder</li>
                <li>Kidney</li>
                <li>Thyroid</li>
                <li>Leukemia</li>
                <li>Residual</li>
              </ul>
            </details>
          );
        })}
      </details>
      <details className="even:bg-epaolivegreen p-2 select-none group max-h-96 overflow-auto">
        <summary className="flex">
          Inhalation Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        {radionuclides.map((radionuclide: string) => {
          return (
            <details className="pl-2 pt-2 space-y-2 text-sm">
              <summary>
                {radionuclide}
              </summary>
              <ul className="pl-4">
                <li onClick={() => handleClick(radionuclide, "esophagus")}>Esophagus</li>
                <li onClick={() => handleClick(radionuclide, "stomach")}>Stomach</li>
                <li onClick={() => handleClick(radionuclide, "colon")}>Colon</li>
                <li onClick={() => handleClick(radionuclide, "liver")}>Liver</li>
                <li onClick={() => handleClick(radionuclide, "lung")}>Lung</li>
                <li onClick={() => handleClick(radionuclide, "bone")}>Bone</li>
                <li onClick={() => handleClick(radionuclide, "skin")}>Skin</li>
                <li onClick={() => handleClick(radionuclide, "breast")}>Breast</li>
                <li onClick={() => handleClick(radionuclide, "ovary")}>Ovary</li>
                <li onClick={() => handleClick(radionuclide, "bladder")}>Bladder</li>
                <li onClick={() => handleClick(radionuclide, "kidney")}>Kidney</li>
                <li onClick={() => handleClick(radionuclide, "thyroid")}>Thyroid</li>
                <li onClick={() => handleClick(radionuclide, "leukemia")}>Leukemia</li>
                <li onClick={() => handleClick(radionuclide, "residual")}>Residual</li>
              </ul>
            </details>
          );
        })}
      </details>
      <details className="even:bg-epaolivegreen p-2">
        <summary className="flex" onClick={() => setTable(2)}>
          Usage Function
        </summary>
      </details>
      <details className="even:bg-epaolivegreen p-2">
        <summary className="flex" onClick={() => setTable(3)}>
          Survival Function
        </summary>
      </details>
    </div>
  );
};

export default DataMenu;