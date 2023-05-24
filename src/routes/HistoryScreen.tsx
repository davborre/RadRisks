import { useState } from "react";
import HistoryMenu from "../components/HistoryMenu";
import CalculationsTable from "../components/CalculationsTable";
import { Calculation, OutputData } from "../utils";

const HistoryScreen = () => {
  const [calculation, setCalculation] = useState<Calculation | {}>({});
  const [txtTables, setTxtTables] = useState<OutputData[]>([]);

  return (
    <>
      <HistoryMenu setCalculation={setCalculation} txtTables={txtTables} />
      <CalculationsTable calculation={calculation} setTxtTables={setTxtTables} />
    </>
  )
}

export default HistoryScreen