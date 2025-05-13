'use client';

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChampPieChartProps = {
  champName: string[];
};

export default function ChampPieChart({ champName }: ChampPieChartProps) {
  const champCounts: { [champ: string]: number } = {};
  champName.forEach(champ => {
    champCounts[champ] = (champCounts[champ] || 0) + 1;
  });

  const data = {
    labels: Object.keys(champCounts),
    datasets: [
      {
        data: Object.values(champCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
    },
  };

  return <Pie data={data} options={options} />;
}
