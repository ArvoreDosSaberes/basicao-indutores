import React, { useState } from "react";

const IndutoresComuns = () => {
  const [parameters, setParameters] = useState({
    inductance: "", // Indutância em Henrys
    current: "", // Corrente máxima em Amperes
    turns: "", // Número de espiras
    coreType: "Air", // Tipo de núcleo (Air, Ferrite, Iron)
    coreLength: "", // Comprimento médio do núcleo em metros
    coreArea: "", // Área da seção transversal do núcleo em metros quadrados
  });

  const [result, setResult] = useState(null);

  // Permeabilidade relativa baseada no tipo de núcleo
  const getPermeability = (coreType) => {
    switch (coreType) {
      case "Air":
        return 1.0; // Núcleo de ar
      case "Ferrite":
        return 5000; // Valor típico para ferrite
      case "Iron":
        return 200; // Valor típico para ferro
      default:
        return 1.0; // Valor padrão
    }
  };

  const calculateInductor = () => {
    const { inductance, current, turns, coreType, coreLength, coreArea } =
      parameters;

    if (!inductance && !turns && !coreArea) {
      alert(
        "Por favor, preencha pelo menos a indutância, número de espiras ou área do núcleo."
      );
      return;
    }

    // Permeabilidade absoluta (µ = µ_r * µ_0)
    const mu0 = 4 * Math.PI * 1e-7; // Permeabilidade do vácuo
    const mu = getPermeability(coreType) * mu0;

    // Cálculos
    let calculatedTurns, calculatedInductance, calculatedCoreArea, wireGauge;

    // Calcular Indutância
    if (inductance && turns && coreArea) {
      calculatedInductance =
        (mu * Math.pow(turns, 2) * coreArea) / coreLength;
    }

    // Calcular Área do Núcleo
    if (inductance && turns) {
      calculatedCoreArea =
        (inductance * coreLength) / (mu * Math.pow(turns, 2));
    }

    // Calcular Número de Espiras
    if (inductance && coreArea) {
      calculatedTurns = Math.sqrt(
        (inductance * coreLength) / (mu * coreArea)
      );
    }

    // Dimensionamento do fio (corrente máxima)
    if (current) {
      const currentDensity = 6; // Densidade de corrente típica em A/mm²
      wireGauge = (current / currentDensity).toFixed(2); // Seção do fio necessária em mm²
    }

    setResult({
      calculatedInductance: calculatedInductance
        ? `${calculatedInductance.toFixed(6)} H`
        : "Não calculado",
      calculatedTurns: calculatedTurns
        ? `${calculatedTurns.toFixed(0)} espiras`
        : "Não calculado",
      calculatedCoreArea: calculatedCoreArea
        ? `${calculatedCoreArea.toFixed(6)} m²`
        : "Não calculado",
      wireGauge: wireGauge
        ? `${wireGauge} mm²`
        : "Corrente não especificada",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cálculo de Indutores Comuns</h1>
      <form>
        <label>
          Indutância (H):
          <input
            type="number"
            name="inductance"
            value={parameters.inductance}
            onChange={(e) => setParameters({ ...parameters, inductance: e.target.value })}
          />
        </label>
        <br />
        <label>
          Corrente Máxima (A):
          <input
            type="number"
            name="current"
            value={parameters.current}
            onChange={(e) => setParameters({ ...parameters, current: e.target.value })}
          />
        </label>
        <br />
        <label>
          Número de Espiras:
          <input
            type="number"
            name="turns"
            value={parameters.turns}
            onChange={(e) => setParameters({ ...parameters, turns: e.target.value })}
          />
        </label>
        <br />
        <label>
          Tipo de Núcleo:
          <select
            name="coreType"
            value={parameters.coreType}
            onChange={(e) => setParameters({ ...parameters, coreType: e.target.value })}
          >
            <option value="Air">Ar</option>
            <option value="Ferrite">Ferrite</option>
            <option value="Iron">Ferro</option>
          </select>
        </label>
        <br />
        <label>
          Comprimento Médio do Núcleo (m):
          <input
            type="number"
            name="coreLength"
            value={parameters.coreLength}
            onChange={(e) => setParameters({ ...parameters, coreLength: e.target.value })}
          />
        </label>
        <br />
        <label>
          Área da Seção Transversal do Núcleo (m²):
          <input
            type="number"
            name="coreArea"
            value={parameters.coreArea}
            onChange={(e) => setParameters({ ...parameters, coreArea: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={calculateInductor}>
          Calcular
        </button>
      </form>

      {result && (
        <div>
          <h2>Resultados</h2>
          <p>Indutância Calculada: {result.calculatedInductance}</p>
          <p>Número de Espiras Calculado: {result.calculatedTurns}</p>
          <p>Área do Núcleo Calculada: {result.calculatedCoreArea}</p>
          <p>Seção do Fio Necessária: {result.wireGauge}</p>
        </div>
      )}
    </div>
  );
};

export default IndutoresComuns;
