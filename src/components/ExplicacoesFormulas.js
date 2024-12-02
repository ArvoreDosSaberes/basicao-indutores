import React from "react";
import { MathJax } from "better-react-mathjax";

const ExplicacoesFormulas = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Explicações e Fórmulas</h1>
      <p>
        Este módulo explica em detalhes as fórmulas utilizadas para calcular os parâmetros de indutores e transformadores. Abordaremos suas variáveis, aplicações e limitações para facilitar o entendimento.
      </p>

      <h2>1. Produto Volt-Tempo (\(V-T\))</h2>
      <p>
        O produto Volt-Tempo relaciona a tensão aplicada ao enrolamento com o tempo de aplicação dessa tensão. É calculado como:
      </p>
      <MathJax>
        {`\\[
        V-T = \\frac{10^6}{F} \\cdot D_{\\text{max}} \\cdot V_{\\text{DCmin}}
        \\]`}
      </MathJax>
      <p>**Variáveis:**</p>
      <ul>
        <li>
          <MathJax inline>{"F"}</MathJax>: Frequência de comutação (Hz)
        </li>
        <li>
          <MathJax inline>{"D_{\\text{max}}"}</MathJax>: Ciclo de trabalho máximo (valor entre 0 e 1)
        </li>
        <li>
          <MathJax inline>{"V_{\\text{DCmin}}"}</MathJax>: Tensão mínima de entrada no primário (V)
        </li>
      </ul>
      <p>
        <strong>Aplicação:</strong> Determina o limite máximo de operação do núcleo, evitando saturação magnética.
      </p>

      <h2>2. Número de Espiras Primárias (\(N_p\))</h2>
      <p>
        O número de espiras primárias é dimensionado para evitar saturação do núcleo. A fórmula é:
      </p>
      <MathJax>
        {`\\[
        N_p = \\frac{V-T \\cdot 10^2}{B_{\\text{max}} \\cdot A_e}
        \\]`}
      </MathJax>
      <p>**Variáveis:**</p>
      <ul>
        <li>
          <MathJax inline>{"V-T"}</MathJax>: Produto Volt-Tempo (\(V \\cdot \\mu s\))
        </li>
        <li>
          <MathJax inline>{"B_{\\text{max}}"}</MathJax>: Densidade máxima de fluxo magnético (Tesla)
        </li>
        <li>
          <MathJax inline>{"A_e"}</MathJax>: Área efetiva do núcleo (\(cm^2\))
        </li>
      </ul>
      <p>
        <strong>Aplicação:</strong> Essa fórmula é fundamental para evitar saturação do núcleo em transformadores e indutores.
      </p>

      <h2>3. Razão de Espiras (\(N_s / N_p\))</h2>
      <p>
        A razão entre espiras secundárias e primárias define a relação de transformação do transformador. Depende da topologia:
      </p>
      <h3>Flyback</h3>
      <MathJax>
        {`\\[
        \\frac{N_s}{N_p} = \\frac{(V_s + V_d) \\cdot (1 - D_{\\text{max}})}{V_{\\text{DCmin}} \\cdot D_{\\text{max}}}
        \\]`}
      </MathJax>
      <h3>Forward</h3>
      <MathJax>
        {`\\[
        \\frac{N_s}{N_p} = \\frac{V_s + V_d}{V_{\\text{DCmin}} \\cdot D_{\\text{max}}}
        \\]`}
      </MathJax>
      <h3>Push-Pull, Half-Bridge e Full-Bridge</h3>
      <MathJax>
        {`\\[
        \\frac{N_s}{N_p} = \\frac{V_s + V_d}{V_{\\text{DCmin}} \\cdot 2 \\cdot D_{\\text{max}}} \\cdot \\left(1 + \\frac{\\text{Reg}}{100}\\right)
        \\]`}
      </MathJax>
      <p>**Variáveis:**</p>
      <ul>
        <li>
          <MathJax inline>{"V_s"}</MathJax>: Tensão de saída no secundário (V)
        </li>
        <li>
          <MathJax inline>{"V_d"}</MathJax>: Queda de tensão no diodo (V)
        </li>
        <li>
          <MathJax inline>{"V_{\\text{DCmin}}"}</MathJax>: Tensão mínima de entrada no primário (V)
        </li>
        <li>
          <MathJax inline>{"D_{\\text{max}}"}</MathJax>: Ciclo de trabalho máximo
        </li>
        <li>
          <MathJax inline>{"\\text{Reg}"}</MathJax>: Regulação de tensão (%)
        </li>
      </ul>
      <p>
        <strong>Aplicação:</strong> Define a relação de transformação entre os enrolamentos primário e secundário para atender aos requisitos de tensão de saída.
      </p>

      <h2>4. Indutância Primária (\(L_p\))</h2>
      <p>
        A indutância primária é calculada para garantir o armazenamento de energia suficiente no núcleo. A fórmula é:
      </p>
      <MathJax>
        {`\\[
        L_p = \\frac{\\eta \\cdot (V_{\\text{DCmin}} \\cdot D_{\\text{max}})^2}{2 \\cdot P_o \\cdot F}
        \\]`}
      </MathJax>
      <p>**Variáveis:**</p>
      <ul>
        <li>
          <MathJax inline>{"\\eta"}</MathJax>: Eficiência do transformador (valor entre 0 e 1)
        </li>
        <li>
          <MathJax inline>{"V_{\\text{DCmin}}"}</MathJax>: Tensão mínima de entrada no primário (V)
        </li>
        <li>
          <MathJax inline>{"D_{\\text{max}}"}</MathJax>: Ciclo de trabalho máximo
        </li>
        <li>
          <MathJax inline>{"P_o"}</MathJax>: Potência de saída (W)
        </li>
        <li>
          <MathJax inline>{"F"}</MathJax>: Frequência de operação (Hz)
        </li>
      </ul>
      <p>
        <strong>Aplicação:</strong> Garante o armazenamento de energia no núcleo para transferi-la ao secundário.
      </p>

      <h2>5. Gap do Núcleo (\(A_L\))</h2>
      <p>
        O gap do núcleo é ajustado para evitar saturação magnética. A fórmula é:
      </p>
      <MathJax>
        {`\\[
        A_L = \\frac{L}{N_p^2}
        \\]`}
      </MathJax>
      <p>**Variáveis:**</p>
      <ul>
        <li>
          <MathJax inline>{"L"}</MathJax>: Indutância primária (H)
        </li>
        <li>
          <MathJax inline>{"N_p"}</MathJax>: Número de espiras primárias
        </li>
      </ul>
      <p>
        <strong>Aplicação:</strong> Essencial para evitar saturação em transformadores e indutores.
      </p>
    </div>
  );
};

export default ExplicacoesFormulas;
