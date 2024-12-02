import React, { useState } from "react";

const TransformadoresToroidais = () => {
  const [parameters, setParameters] = useState({
    primaryVoltage: "", // Tensão primária
    secondaryVoltages: [{ voltage: "", current: "" }], // Lista de tensões secundárias
    frequency: 60, // Frequência em Hz
    power: "", // Potência em Watts
    fluxDensity: 1.2, // Densidade de fluxo magnético (T)
    outerRadius: "", // Raio externo (mm)
    innerRadius: "", // Raio interno (mm)
    height: "", // Altura do núcleo (mm)
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParameters({ ...parameters, [name]: value });
  };

  const handleSecondaryChange = (index, field, value) => {
    const updatedSecondaries = [...parameters.secondaryVoltages];
    updatedSecondaries[index][field] = value;
    setParameters({ ...parameters, secondaryVoltages: updatedSecondaries });
  };

  const addSecondary = () => {
    setParameters({
      ...parameters,
      secondaryVoltages: [...parameters.secondaryVoltages, { voltage: "", current: "" }],
    });
  };

  const removeSecondary = (index) => {
    const updatedSecondaries = parameters.secondaryVoltages.filter((_, i) => i !== index);
    setParameters({ ...parameters, secondaryVoltages: updatedSecondaries });
  };

  const calculateTransformer = () => {
    const {
      primaryVoltage,
      secondaryVoltages,
      frequency,
      fluxDensity,
      outerRadius,
      innerRadius,
      height,
    } = parameters;

    if (!primaryVoltage || !frequency || !fluxDensity || !outerRadius || !innerRadius || !height) {
      alert("Por favor, preencha todos os campos necessários.");
      return;
    }

    // Convertendo dimensões para metros
    const outerRadiusMeters = outerRadius / 1000;
    const innerRadiusMeters = innerRadius / 1000;
    const heightMeters = height / 1000;

    // Área efetiva do núcleo (m²)
    const coreArea = Math.PI * heightMeters * (outerRadiusMeters ** 2 - innerRadiusMeters ** 2);

    // Comprimento médio do caminho magnético (m)
    const coreLength = 2 * Math.PI * ((outerRadiusMeters + innerRadiusMeters) / 2);

    // Produto Volt-Tempo (V-T)
    const VT = (primaryVoltage * 1e4) / (4.44 * frequency * fluxDensity * coreArea);

    // Número de espiras primárias
    const primaryTurns = Math.round(VT);

    // Calculando espiras secundárias
    const secondaryTurns = secondaryVoltages.map((sec) => ({
      voltage: sec.voltage,
      turns: Math.round((sec.voltage * primaryTurns) / primaryVoltage),
    }));

    // Potência máxima suportada pelo núcleo
    const maxPower = 4.44 * frequency * fluxDensity * coreArea ** 2;

    setResult({
      coreArea: coreArea.toFixed(6),
      coreLength: coreLength.toFixed(6),
      primaryTurns,
      secondaryTurns,
      maxPower: maxPower.toFixed(2),
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cálculo de Transformadores Toroidais</h1>
      <form>
        <label>
          Tensão Primária (V):
          <input
            type="number"
            name="primaryVoltage"
            value={parameters.primaryVoltage}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Potência (W):
          <input
            type="number"
            name="power"
            value={parameters.power}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Frequência (Hz):
          <input
            type="number"
            name="frequency"
            value={parameters.frequency}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Densidade Máxima de Fluxo Magnético (T):
          <input
            type="number"
            name="fluxDensity"
            value={parameters.fluxDensity}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Raio Externo (mm):
          <input
            type="number"
            name="outerRadius"
            value={parameters.outerRadius}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Raio Interno (mm):
          <input
            type="number"
            name="innerRadius"
            value={parameters.innerRadius}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Altura do Núcleo (mm):
          <input
            type="number"
            name="height"
            value={parameters.height}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <h3>Enrolamentos Secundários:</h3>
        {parameters.secondaryVoltages.map((sec, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>
              Tensão Secundária (V):
              <input
                type="number"
                value={sec.voltage}
                onChange={(e) => handleSecondaryChange(index, "voltage", e.target.value)}
              />
            </label>
            <label>
              Corrente Secundária (A):
              <input
                type="number"
                value={sec.current}
                onChange={(e) => handleSecondaryChange(index, "current", e.target.value)}
              />
            </label>
            <button type="button" onClick={() => removeSecondary(index)}>
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={addSecondary}>
          Adicionar Secundário
        </button>
        <br />
        <button type="button" onClick={calculateTransformer}>
          Calcular
        </button>
      </form>

      {result && (
        <div>
          <h2>Resultados</h2>
          <p>Área Efetiva do Núcleo: {result.coreArea} m²</p>
          <p>Comprimento Médio do Caminho Magnético: {result.coreLength} m</p>
          <p>Espiras Primárias: {result.primaryTurns}</p>
          <h3>Espiras Secundárias:</h3>
          {result.secondaryTurns.map((sec, index) => (
            <p key={index}>
              Tensão: {sec.voltage}V - Espiras: {sec.turns}
            </p>
          ))}
          <p>Potência Máxima do Núcleo: {result.maxPower} W</p>
        </div>
      )}
    </div>
  );
};

export default TransformadoresToroidais;
