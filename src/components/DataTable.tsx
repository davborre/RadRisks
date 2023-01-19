import React from 'react'

const DataTable = () => {
  return (
    <table className="table-auto mx-auto text-left mt-5">
      <thead className="bg-epablue text-white">
        <tr className="border">
          <th className="border" />
          <th colSpan={2} className="border">Inhalation (m3/d)</th>
          <th colSpan={2} className="border">Tapwater Usage (L/d)</th>
          <th colSpan={2} className="border">Dietary (kcal/d)</th>
        </tr>
        <tr>
          <th className="pr-10 border">Age</th>
          <th className="pr-20 border">Male</th>
          <th className="pr-20 border">Female</th>
          <th className="pr-20 border">Male</th>
          <th className="pr-20 border">Female</th>
          <th className="pr-20 border">Male</th>
          <th className="pr-20 border">Female</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-epalightblue">
          <td className="border">0</td>
          <td className="border">2.900E+00</td>
          <td className="border">2.900E+00</td>
          <td className="border">1.911E-01</td>
          <td className="border">1.880E-01</td>
          <td className="border">4.777E+02</td>
          <td className="border">4.700E+02</td>
        </tr>
        <tr>
          <td>1</td>
          <td>5.200E+00</td>
          <td>5.200E+00</td>
          <td>2.225E-01</td>
          <td>2.162E-01</td>
          <td>7.912E+02</td>
          <td>7.517E+02</td>
        </tr>
        <tr className="bg-epalightblue">
          <td>2</td>
          <td>6.480E+00</td>
          <td>6.480E+00</td>
          <td>2.856E-01</td>
          <td>2.725E-01</td>
          <td>1.109E+03</td>
          <td>1.033E+03</td>
        </tr>
      </tbody>
    </table>
  )
}

export default DataTable