import React from "react";

const BitolasDeFio = () => {
  const bitolas = [
    { awg: "4/0", swg: "7/0", diameter_mm: 11.684, current_max_a: 380 },
    { awg: "3/0", swg: "6/0", diameter_mm: 10.405, current_max_a: 320 },
    { awg: "2/0", swg: "5/0", diameter_mm: 9.266, current_max_a: 267 },
    { awg: "1/0", swg: "4/0", diameter_mm: 8.251, current_max_a: 200 },
    { awg: "1", swg: "0", diameter_mm: 7.348, current_max_a: 150 },
    { awg: "2", swg: "00", diameter_mm: 6.544, current_max_a: 125 },
    { awg: "3", swg: "1", diameter_mm: 5.827, current_max_a: 100 },
    { awg: "4", swg: "2", diameter_mm: 5.189, current_max_a: 85 },
    { awg: "5", swg: "3", diameter_mm: 4.621, current_max_a: 70 },
    { awg: "6", swg: "4", diameter_mm: 4.115, current_max_a: 55 },
    { awg: "7", swg: "5", diameter_mm: 3.665, current_max_a: 50 },
    { awg: "8", swg: "6", diameter_mm: 3.264, current_max_a: 40 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tabela de Bitolas de Fios</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>AWG</th>
            <th>SWG</th>
            <th>Diâmetro (mm)</th>
            <th>Corrente Máxima (A)</th>
          </tr>
        </thead>
        <tbody>
          {bitolas.map((fio, index) => (
            <tr key={index}>
              <td>{fio.awg}</td>
              <td>{fio.swg}</td>
              <td>{fio.diameter_mm}</td>
              <td>{fio.current_max_a}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BitolasDeFio;
