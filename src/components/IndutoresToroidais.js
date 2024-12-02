import React, { useState } from "react";

const TransformadoresToroidais = () => {
  const [parameters, setParameters] = useState({
    topology: "Comum",
    primaryVoltage1: "",
    primaryVoltage2: "",
    secondaryVoltages: [{ voltage: "", current: "" }],
    power: "",
    frequency: 60,
    maxFluxDensity: 1.2, // Em Tesla
    outerRadius: "",
    innerRadius: "",
    height: "",
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
      topology,
      primaryVoltage1,
      secondaryVoltages,
      power,
      frequency,
      maxFluxDensity,
      outerRadius,
      innerRadius,
      height,
    } = parameters;

    if (
      !primaryVoltage1 ||
      !secondaryVoltages.length ||
      !power ||
      !outerRadius ||
      !innerRadius ||
      !height
    ) {
      alert("Por favor, preencha todos os campos necessários para o cálculo.");
      return;
    }

    // Convertendo dimensões para metros
    const outerRadiusMeters = outerRadius / 1000;
    const innerRadiusMeters = innerRadius / 1000;
    const heightMeters = height / 1000;

    // Área efetiva do núcleo
    const coreArea = Math.PI * heightMeters * (outerRadiusMeters ** 2 - innerRadiusMeters ** 2);

    // Comprimento médio do caminho magnético
    const coreLength = 2 * Math.PI * ((outerRadiusMeters + innerRadiusMeters) / 2);

    // Cálculo das espiras primárias
    const primaryTurns = Math.round(
      (primaryVoltage1 * 10e4) / (4.44 * frequency * maxFluxDensity * coreArea)
    );

    // Cálculo das espiras secundárias
    const secondaryTurns = secondaryVoltages.map((sec) => ({
      voltage: sec.voltage,
      turns: Math.round((sec.voltage * primaryTurns) / primaryVoltage1),
    }));

    // Potência máxima suportada pelo núcleo
    const maxPower = 4.44 * frequency * maxFluxDensity * coreArea ** 2;

    setResult({
      topology,
      coreArea: coreArea.toFixed(6),
      coreLength: coreLength.toFixed(3),
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
          Topologia:
          <select
            name="topology"
            value={parameters.topology}
            onChange={handleInputChange}
          >
            <option value="Comum">Comum</option>
          </select>
        </label>
        <br />
        <label>
          Tensão Primária 1 (V):
          <input
            type="number"
            name="primaryVoltage1"
            value={parameters.primaryVoltage1}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Tensão Primária 2 (opcional, V):
          <input
            type="number"
            name="primaryVoltage2"
            value={parameters.primaryVoltage2}
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
          Densidade Máxima de Fluxo (T):
          <input
            type="number"
            name="maxFluxDensity"
            value={parameters.maxFluxDensity}
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
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label>
              Tensão Secundária {index + 1} (V):
              <input
                type="number"
                value={sec.voltage}
                onChange={(e) => handleSecondaryChange(index, "voltage", e.target.value)}
              />
            </label>
            <label>
              Corrente Secundária {index + 1} (A):
              <input
                type="number"
                value={sec.current}
                onChange={(e) => handleSecondaryChange(index, "current", e.target.value)}
              />
            </label>
            <button type="button" onClick={() => removeSecondary(index)} style={{ marginLeft: "10px" }}>
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
          <p>Topologia: {result.topology}</p>
          <p>Área Efetiva do Núcleo: {result.coreArea} m²</p>
          <p>Comprimento Médio do Caminho Magnético: {result.coreLength} m</p>
          <p>Espiras Primárias: {result.primaryTurns}</p>
          <p>Potência Máxima Suportada pelo Núcleo: {result.maxPower} W</p>
          <h3>Espiras Secundárias:</h3>
          {result.secondaryTurns.map((sec, index) => (
            <p key={index}>
              Tensão: {sec.voltage}V - Espiras: {sec.turns}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransformadoresToroidais;
