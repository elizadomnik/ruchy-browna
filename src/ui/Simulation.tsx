import { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { saveTrajectoryToXLS } from "../lib/saveTrajectoryToXLSFile";
import { chartConfig } from "../lib/chartConfig";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Trajectory = {
  x: number[];
  y: number[];
};

const DEFAULT_STEPS = 10;

const MAX_RECOMMENDED_STEPS = 5000;

export const Simulation = () => {
  const [steps, setSteps] = useState(DEFAULT_STEPS);
  const [trajectory, setTrajectory] = useState<Trajectory>({ x: [], y: [] });
  const [distance, setDistance] = useState(0);
  const [showLine, setShowLine] = useState(true);

  const isTrajectoryEmpty = trajectory.x.length < 1 && trajectory.y.length < 1; 

  /**
   * Symuluje ruch Browna dla podanej liczby kroków.
   *
   * @param {number} n - Liczba kroków dla symulacji.
   * @return {void} Brak zwracanej wartości.
   */

  const simulateBrownianMotion = (n: number) => {
    let x = 0;
    let y = 0;
    const cooridnates: Record<'x' | 'y', number[]> = { x: [0], y: [0] };

    for (let i = 0; i < n; i++) {
      const angle = Math.random() * 2 * Math.PI;
      x += Math.cos(angle); 
      y += Math.sin(angle);
      cooridnates.x.push(x);
      cooridnates.y.push(y);
    }
    setTrajectory(cooridnates);
    const finalDistance = Math.sqrt(x * x + y * y); 
    setDistance(finalDistance);
  };

  const startSimulation = () => {
    simulateBrownianMotion(steps);
  };

  /**
   * Dane odpowiedzialne za odpowiednia reprezentacje trajektorii punktow x i y na wykresie.
   */

  const data = {
    datasets: [
      {
        label: "Trajektoria cząsteczki po osi współrzędnych",
        data: trajectory.x.map((x, index) => ({ x, y: trajectory.y[index], index })),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.5)",
        showLine: showLine,
      },
    ],
  };

  return (
    <div className="main-container">
      <h1>Symulacja ruchu Browna</h1>
      <div>
        <label htmlFor="steps">
          Podaj liczbe kroków:
        </label>
        <div className="action">
        <input
            type="number"
            value={steps}
            id="steps"
            className="input"
            onChange={(e) => setSteps(Number(e.target.value))}
          />
        <button onClick={startSimulation}>Symuluj</button>
        </div>
        <p className="steps-constrain-description">Ze względów wydajnościowych zalecana liczba kroków powinna się ograniczac do {MAX_RECOMMENDED_STEPS}</p>
      </div>
      <div>
        <p>Czasteczka przemieściła się na odległość ok. {distance.toFixed(2)}</p>
      </div>
      <button
        disabled={isTrajectoryEmpty}
        onClick={() => setShowLine(!showLine)}
      >
        {showLine ? "Ukryj" : "Pokaz"} linie
      </button>
      <div className="chart-container">
        <Scatter
          data={data}
          //@ts-expect-error tbf
          options={chartConfig}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <button disabled={isTrajectoryEmpty} onClick={() => saveTrajectoryToXLS(trajectory)}>Pobierz plik .xls</button>
      <footer>Wykonane przez Eliza Domnik</footer>
    </div>
  );
};
