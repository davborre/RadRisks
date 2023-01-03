import { ChevronDown } from "react-feather";

const DataMenu = () => {
  return (
    <div className="h-screen w-80 bg-epasagegreen pt-4 flex flex-col overflow-auto">
      <h1 className="font-bold pl-2 mb-8">Data</h1>
      <details className="even:bg-epaolivegreen p-2 select-none group">
        <summary className="flex">
          Risk Coefficients
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
          <li>Ac-224</li>
          <ul className="pl-4">
            <li>Esophagus</li>
            <li>Stomach</li>
            <li>Colon</li>
            <li>...</li>
          </ul>
          <li>Ac-225</li>
          <li>Ac-226</li>
          <li>...</li>
        </ul>
      </details>
      <details className="even:bg-epaolivegreen p-2 select-none group">
        <summary className="flex">
          Usage Function
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
          <li>Inhalation</li>
          <li>Tapwater Usage</li>
          <li>Dietary Ingestion</li>
          <li>All</li>
        </ul>
      </details>
      <details className="even:bg-epaolivegreen p-2 select-none group">
        <summary className="flex">
          Survival Function
          <ChevronDown className="ml-auto group-open:rotate-180" />
        </summary>
        <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
          <li>Extrapolated Survival</li>
          <li>Average Remaining Lifetime</li>
          <li>Male to Female Ratio</li>
          <li>All</li>
        </ul>
      </details>
    </div>
  );
};

export default DataMenu;