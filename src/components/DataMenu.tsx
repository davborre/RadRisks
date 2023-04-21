import { ChevronDown } from "react-feather";
import { radionuclides } from "../data/radionuclides";
import { useState } from "react";

const DataMenu = ({ setTable, setRadionuclide, setCancer, setIntakeMethod }: { setTable: React.Dispatch<React.SetStateAction<number>>, setRadionuclide: React.Dispatch<React.SetStateAction<string>>, setCancer: React.Dispatch<React.SetStateAction<string>>, setIntakeMethod: React.Dispatch<React.SetStateAction<string>> }) => {
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedRadionuclide, setSelectedRadionuclide] = useState('');
  const [selectedCancer, setSelectedCancer] = useState('');

  function handleClick(radionuclide: string, cancer: string, selectedFunction: string) {
    setTable(1);
    setRadionuclide(radionuclide);
    setCancer(cancer);
    setSelectedRadionuclide(radionuclide);
    setSelectedCancer(cancer);
    setSelectedFunction(selectedFunction);
    setIntakeMethod(selectedFunction.slice(0, 3));
  }

  return (
    <div className="h-screen w-80 bg-epasagegreen dark:bg-blackolive dark:text-white pt-4 flex flex-col overflow-auto">
      <h1 className="font-bold pl-2 mb-8">Data</h1>
      <details className="even:bg-epaolivegreen dark:even:bg-eerieblack p-2 select-none group max-h-96 overflow-auto">
        <summary className={`flex ${(selectedFunction == 'ingestion') ? 'font-bold' : ''}`}>
          Ingestion Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        {radionuclides.map((radionuclide: string) => {
          return (
            <details className="pl-2 pt-2 space-y-2 text-sm">
              <summary className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide) ? 'font-bold' : ''}`}>
                {radionuclide}
              </summary>
              <ul className="pl-4">
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'esophagus') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "esophagus", 'ingestion')}>Esophagus</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'stomach') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "stomach", 'ingestion')}>Stomach</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'colon') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "colon", 'ingestion')}>Colon</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'liver') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "liver", 'ingestion')}>Liver</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'lung') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "lung", 'ingestion')}>Lung</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'bone') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "bone", 'ingestion')}>Bone</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'skin') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "skin", 'ingestion')}>Skin</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'breast') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "breast", 'ingestion')}>Breast</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'ovary') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "ovary", 'ingestion')}>Ovary</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'bladder') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "bladder", 'ingestion')}>Bladder</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'kidney') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "kidney", 'ingestion')}>Kidney</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'thyroid') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "thyroid", 'ingestion')}>Thyroid</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'leukemia') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "leukemia", 'ingestion')}>Leukemia</li>
                <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == 'residual') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "residual", 'ingestion')}>Residual</li>
              </ul>
            </details>
          );
        })}
      </details>
      <details className="even:bg-epaolivegreen p-2 select-none group max-h-96 overflow-auto">
        <summary className={`flex ${(selectedFunction == 'inhalation') ? 'font-bold' : ''}`}>
          Inhalation Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        {radionuclides.map((radionuclide: string) => {
          return (
            <details className="pl-2 pt-2 space-y-2 text-sm">
              <summary className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide) ? 'font-bold' : ''}`}>
                {radionuclide}
              </summary>
              <ul className="pl-4">
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'esophagus') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "esophagus", 'inhalation')}>Esophagus</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'stomach') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "stomach", 'inhalation')}>Stomach</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'colon') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "colon", 'inhalation')}>Colon</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'liver') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "liver", 'inhalation')}>Liver</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'lung') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "lung", 'inhalation')}>Lung</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'bone') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "bone", 'inhalation')}>Bone</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'skin') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "skin", 'inhalation')}>Skin</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'breast') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "breast", 'inhalation')}>Breast</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'ovary') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "ovary", 'inhalation')}>Ovary</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'bladder') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "bladder", 'inhalation')}>Bladder</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'kidney') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "kidney", 'inhalation')}>Kidney</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'thyroid') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "thyroid", 'inhalation')}>Thyroid</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'leukemia') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "leukemia", 'inhalation')}>Leukemia</li>
                <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == 'residual') ? 'font-bold' : ''}`} onClick={() => handleClick(radionuclide, "residual", 'inhalation')}>Residual</li>
              </ul>
            </details>
          );
        })}
      </details>
      <details className="even:bg-epaolivegreen dark:even:bg-eerieblack p-2">
        <summary className={`flex ${(selectedFunction == 'usage') ? 'font-bold' : ''}`}
          onClick={() => {
            setTable(2);
            setSelectedFunction('usage');
          }}
        >
          Usage Function
        </summary>
      </details>
      <details className="even:bg-epaolivegreen p-2">
        <summary className={`flex ${(selectedFunction == 'survival') ? 'font-bold' : ''}`}
          onClick={() => {
            setTable(3);
            setSelectedFunction('survival');
          }}
        >
          Survival Function
        </summary>
      </details>
    </div>
  );
};

export default DataMenu;