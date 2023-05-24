import { useState } from 'react';
import InputMenu from '../components/InputMenu';
import CalculationsTable from '../components/CalculationsTable';
import { Calculation, OutputData } from '../utils';

const InputScreen = () => {
  const [calculation, setCalculation] = useState<Calculation | {}>({});
  const [txtTables, setTxtTables] = useState<OutputData[]>([]);

  return (
    <>
      <InputMenu setCalculation={setCalculation} txtTables={txtTables} />
      <CalculationsTable calculation={calculation} setTxtTables={setTxtTables} />
    </>
  )
}

export default InputScreen