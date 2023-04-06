import { useState } from 'react';
import InputMenu from '../components/InputMenu';
import CalculationsTable from '../components/CalculationsTable';

const InputScreen = () => {
  const [calculation, setCalculation] = useState({});
  const [txtTables, setTxtTables] = useState([]);

  return (
    <>
      <InputMenu setCalculation={setCalculation} txtTables={txtTables} />
      <CalculationsTable calculation={calculation} setTxtTables={setTxtTables} />
    </>
  )
}

export default InputScreen