import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getTextMonth, options } from '../chartUtils';
import { IStatistics } from '../model';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBar = ({ data }: { data: IStatistics[] }) => {
  const labels = data.map((item: IStatistics) => {
    const month: Date = new Date(item.time.min);
    return getTextMonth(month.getMonth());
  });

  const clearData = data.map((item: IStatistics) => {
    return item.value.average;
  });

  const datas = {
    labels,
    datasets: [
      {
        label: 'Emissioni CO2',
        data: labels.map((month: string, index: number) => {
          return clearData[index];
        }),
        backgroundColor: '#1976d2',
      },
    ],
  };

  return <Bar options={options} data={datas} />;
};

export default VerticalBar;
