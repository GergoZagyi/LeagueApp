// chartComponents/VisionChart.tsx
'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type VisionChartProps = {
  wardsPlaced: number[];
  wardsKilled: number[];
};

export default function VisionChart({ wardsPlaced, wardsKilled }: VisionChartProps) {
  const labels = Array.from({ length: wardsPlaced.length }, (_, i) => `Game ${i + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Wards Placed',
        data: wardsPlaced,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Wards Killed',
        data: wardsKilled,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  return <Bar data={data} options={options} />;
}
