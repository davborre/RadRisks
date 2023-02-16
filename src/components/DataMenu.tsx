import { ChevronDown } from "react-feather";
import { radionuclides } from "../data/radionuclides";

const DataMenu = ({ setTable }: { setTable: React.Dispatch<React.SetStateAction<number>> }) => {
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
                <li onClick={() => setTable(1)}>Esophagus</li>
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