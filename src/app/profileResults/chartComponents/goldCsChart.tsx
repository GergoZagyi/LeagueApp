'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
  gold: number[];
  cs: number[];
};

export default function GoldCsChart({ gold, cs }: Props) {
  const labels = Array.from({ length: gold.length }, (_, i) => `Game ${i + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Gold Earned',
        data: gold,
        borderColor: '#facc15',
        backgroundColor: '#facc15',
        tension: 0.3,
        fill: false,
        yAxisID: 'y1', 
      },
      {
        label: 'CS',
        data: cs,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3,
        fill: false,
        yAxisID: 'y2', 
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
      },
      y2: {
        type: 'linear',
        position: 'right',
        ticks: {
          max: Math.max(...cs) + 5, // Adjust for CS scale
          min: 0,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}