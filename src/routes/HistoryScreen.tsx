import { useState } from "react";
import HistoryMenu from "../components/HistoryMenu";
import CalculationsTable from "../components/CalculationsTable";

const HistoryScreen = () => {
  const [calculation, setCalculation] = useState({});
  const [txtTables, setTxtTables] = useState([]);

  return (
    <>
      <HistoryMenu setCalculation={setCalculation} txtTables={txtTables} />
      <CalculationsTable calculation={calculation} setTxtTables={setTxtTables} />
    </>
  )
}

export default HistoryScreen