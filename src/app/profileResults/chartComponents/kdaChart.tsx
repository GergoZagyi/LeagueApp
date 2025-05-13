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

type Props = {
  kills: number;
  deaths: number;
  assists: number;
};

export default function KdaChart({ kills, deaths, assists }: Props) {
  const data = {
    labels: ['Kills', 'Deaths', 'Assists'],
    datasets: [
      {
        label: 'KDA Breakdown',
        data: [kills, deaths, assists],
        backgroundColor: ['#4ade80', '#f87171', '#60a5fa'],
      },
    ],
  };

  return <Bar data={data} />;
} 