import './Chard.css';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';

const LineChard = ({ chartData }) => {
  const options = {
    borderWidth: 1,
    pointRadius: 2,
    fill: true,
    backgroundColor: 'rgb(255, 99, 132)',
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
    tooltips: {
      bodyFontColor: 'red',
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'white',
        },
      },
    },
  };
  return <Line className="chard" data={chartData} options={options} />;
};

export default LineChard;
