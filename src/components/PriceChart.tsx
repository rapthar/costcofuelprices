import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { StationData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceChartProps {
  station: StationData | null;
}

const PriceChart: React.FC<PriceChartProps> = ({ station }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: station ? `Price History - ${station["Store Name"]}` : 'Select a station to view price history',
      },
    },
  };

  // Mock data - in a real app, this would come from an API
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Regular',
        data: labels.map(() => Math.random() * 2 + 3),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Premium',
        data: labels.map(() => Math.random() * 2 + 4),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="h-[300px]">
      <Line options={options} data={data} />
    </div>
  );
};

export default PriceChart;