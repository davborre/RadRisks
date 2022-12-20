import { ChevronDown } from "react-feather";

const HistoryMenu = () => {
  return (
    <div className="h-screen w-80 bg-epasagegreen pt-4 flex flex-col">
      <h1 className="font-bold pl-2 mb-8">History</h1>
      <details className="bg-epaolivegreen p-2">
        <summary className="flex">
          Am-240
          <ChevronDown className="ml-auto" />
        </summary>
        <ul className="pl-2 pt-2 space-y-2 list-none text-sm">
          <li>Inhalation, 25-26, Female, 2022/12/11</li>
          <li>Ingestion, 25-28, Male, 2022/12/11</li>
          <li>Inhalation, 26-30, Female, 2022/12/11</li>
          <li>Inhalation, 25-26, Male, 2022/12/13</li>
        </ul>
      </details>
    </div>
  );
};

export default HistoryMenu;