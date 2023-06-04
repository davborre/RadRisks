import { ChevronDown } from "react-feather";
import { radionuclides } from "../data/radionuclides";
import { cancers } from "../data/cancers";
import { useState } from "react";
import MenuDescription from "./MenuDescription";

const dataDescription = 'Display ingestion or inhalation risk coefficients, usage function, or survival function data used in the risk calculations.'

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
    <div className="h-screen w-80 bg-epasagegreen dark:bg-blackolive dark:text-white pt-4 flex flex-col">
      <h1 className="font-bold pl-2 mb-5">Data</h1>
      <MenuDescription description={dataDescription} />
      <details className="odd:bg-epaolivegreen dark:odd:bg-eerieblack p-2 select-none group max-h-96 overflow-auto mt-5 cursor-default">
        <summary className={`flex ${(selectedFunction == 'ingestion') ? 'font-bold' : ''}`}>
          Ingestion Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        {radionuclides.map((radionuclide: string, i) => {
          return (
            <details className="pl-2 pt-2 space-y-2 text-sm" key={i}>
              <summary className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide) ? 'font-bold' : ''}`}>
                {radionuclide}
              </summary>
              <ul className="pl-4">
                {cancers.map((cancer, j) => {
                  return (
                    <li className={`${(selectedFunction == 'ingestion' && selectedRadionuclide == radionuclide && selectedCancer == cancer) ? 'font-bold' : ''}`} key={j} onClick={() => handleClick(radionuclide, cancer, 'ingestion')}>{cancer.charAt(0).toUpperCase() + cancer.slice(1)}</li>
                  )
                })}
              </ul>
            </details>
          );
        })}
      </details>
      <details className="odd:bg-epaolivegreen p-2 select-none group max-h-96 overflow-auto cursor-default">
        <summary className={`flex ${(selectedFunction == 'inhalation') ? 'font-bold' : ''}`}>
          Inhalation Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        {radionuclides.map((radionuclide: string, i) => {
          return (
            <details className="pl-2 pt-2 space-y-2 text-sm" key={i}>
              <summary className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide) ? 'font-bold' : ''}`}>
                {radionuclide}
              </summary>
              <ul className="pl-4">
                {cancers.map((cancer, j) => {
                  return (
                    <li className={`${(selectedFunction == 'inhalation' && selectedRadionuclide == radionuclide && selectedCancer == cancer) ? 'font-bold' : ''}`} key={j} onClick={() => handleClick(radionuclide, cancer, 'inhalation')}>{cancer.charAt(0).toUpperCase() + cancer.slice(1)}</li>
                  )
                })}
              </ul>
            </details>
          );
        })}
      </details>
      <details className="odd:bg-epaolivegreen dark:odd:bg-eerieblack p-2 cursor-default">
        <summary className={`flex ${(selectedFunction == 'usage') ? 'font-bold' : ''}`}
          onClick={() => {
            setTable(2);
            setSelectedFunction('usage');
          }}
        >
          Usage Function
        </summary>
      </details>
      <details className="odd:bg-epaolivegreen p-2 cursor-default">
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