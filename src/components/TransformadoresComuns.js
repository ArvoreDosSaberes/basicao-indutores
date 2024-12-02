import React, { useState } from "react";

const TransformadoresComuns = () => {
  const [parameters, setParameters] = useState({
    topology: "Comum", // Tipo de topologia padrão
    primaryVoltage1: "", // Tensão primária 1
    primaryVoltage2: "", // Tensão primária 2 (opcional)
    secondaryVoltages: [{ voltage: "", current: "" }], // Lista de tensões secundárias
    frequency: 60, // Frequência em Hz
    power: "", // Potência em Watts
    coreType: "Ferrite", // Tipo de núcleo
    fluxDensity: 1.2, // Densidade de fluxo magnético (T)
    coreArea: "", // Área efetiva do núcleo (cm²)
    regulation: 5, // Regulação de tensão (%)
    dutyCycle: 0.5, // Ciclo de trabalho máximo (Dmax)
    diodeDrop: 0.7, // Queda de tensão no diodo (V)
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
      primaryVoltage2,
      secondaryVoltages,
      frequency,
      fluxDensity,
      coreArea,
      regulation,
      dutyCycle,
      diodeDrop,
    } = parameters;

    if (!primaryVoltage1 || !frequency || !fluxDensity || !coreArea) {
      alert("Por favor, preencha todos os campos necessários.");
      return;
    }

    // Área efetiva do núcleo em m²
    const coreAreaMeters = coreArea / 1e4;

    // Produto Volt-Tempo (V-T)
    const VT = (primaryVoltage1 * 1e4) / (4.44 * frequency * fluxDensity * coreAreaMeters);

    // Número de espiras primárias considerando tensão secundária regulada
    const primaryTurns = Math.round(VT);

    // Calculando espiras secundárias considerando a topologia e regulação
    const secondaryTurns = secondaryVoltages.map((sec) => {
      let turns;
      if (topology === "Flyback") {
        turns = Math.round(
          ((sec.voltage + diodeDrop) * (1 - dutyCycle) * primaryTurns) /
            (primaryVoltage1 * dutyCycle)
        );
      } else if (topology === "Forward") {
        turns = Math.round(((sec.voltage + diodeDrop) * primaryTurns) / (primaryVoltage1 * dutyCycle));
      } else if (topology === "Push-Pull" || topology === "Half-Bridge" || topology === "Full-Bridge") {
        turns = Math.round(
          ((sec.voltage * (1 + regulation / 100) + diodeDrop) * primaryTurns) /
            (primaryVoltage1 * (topology === "Push-Pull" ? 2 : 1))
        );
      } else {
        // Topologia Comum
        turns = Math.round(
          ((sec.voltage * (1 + regulation / 100)) * primaryTurns) / primaryVoltage1
        );
      }
      return { voltage: sec.voltage, turns };
    });

    setResult({
      topology,
      VT: VT.toFixed(2),
      primaryTurns,
      secondaryTurns,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cálculo de Transformadores Comuns</h1>
      <form>
        <label>
          Topologia:
          <select
            name="topology"
            value={parameters.topology}
            onChange={handleInputChange}
          >
            <option value="Comum">Comum</option>
            <option value="Flyback">Flyback</option>
            <option value="Forward">Forward</option>
            <option value="Push-Pull">Push-Pull</option>
            <option value="Half-Bridge">Half-Bridge</option>
            <option value="Full-Bridge">Full-Bridge</option>
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
          Área Efetiva do Núcleo (cm²):
          <input
            type="number"
            name="coreArea"
            value={parameters.coreArea}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Regulação (%):
          <input
            type="number"
            name="regulation"
            value={parameters.regulation}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Ciclo de Trabalho (Dmax):
          <input
            type="number"
            step="0.01"
            name="dutyCycle"
            value={parameters.dutyCycle}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Queda de Tensão no Diodo (V):
          <input
            type="number"
            step="0.1"
            name="diodeDrop"
            value={parameters.diodeDrop}
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
          <p>Topologia: {result.topology}</p>
          <p>Produto Volt-Tempo (V-T): {result.VT} V·µs</p>
          <p>Espiras Primárias: {result.primaryTurns}</p>
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

export default TransformadoresComuns;
