import './Chard.css';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';

const LineChard = ({ chartData }) => {
  const options = {
	scales: {
		x:{
			ticks:{

				color: 'white'
			}

		},
		y:{
			ticks:{

				color: 'white'
			}

		}
	},
	tooltips: {
		bodyFontColor: "red"
	},
	responsive: true,
	maintainAspectRatio: true,
    plugins: {
      legend: {
		display: true,
        labels: {
          color: 'white',
        },
		
      },
    },
  };
  return <Line className="chard" data={chartData} options={options} />;
};

export default LineChard;
