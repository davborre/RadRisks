import { useState } from "react";
import DataMenu from "../components/DataMenu";
import RiskCoefficientsTable from "../components/RiskCoefficientsTable";
import UsageTable from "../components/UsageTable";
import SurvTable from "../components/SurvTable";

const DataScreen = () => {
  const [radionuclide, setRadionuclide] = useState("");
  const [cancer, setCancer] = useState("");
  const [intakeMethod, setIntakeMethod] = useState("");
  const [table, setTable] = useState(-1);

  const cancerCapitalized = cancer.charAt(0).toUpperCase() + cancer.slice(1);
  const intakeMethodFull = (intakeMethod == "inh") ? "Inhalation" : "Ingestion";

  return (
    <>
      <DataMenu setRadionuclide={setRadionuclide} setCancer={setCancer} setTable={setTable} setIntakeMethod={setIntakeMethod} />
      <div className="grow p-20 h-screen overflow-auto">
        {table == 1 && <h1 className="text-center font-bold text-2xl"> {radionuclide} {cancerCapitalized} {intakeMethodFull} Risk Coefficients</h1>}
        {table == 1 && <RiskCoefficientsTable radionuclide={radionuclide} cancer={cancer} intakeMethod={intakeMethod} />}
        {table == 2 && <h1 className="text-center font-bold text-2xl"> Usage Function </h1>}
        {table == 2 && <UsageTable />}
        {table == 3 && <h1 className="text-center font-bold text-2xl"> Survival Function </h1>}
        {table == 3 && <SurvTable />}
      </div>
    </>
  )
}

export default DataScreen