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


function ChartCom(props) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { chartLabels, dataList, chartTitle, color } = props;

  const options = {
    // responsive: true,
    // esponsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };
  
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "دقیقه", 
        data: dataList[0] ? dataList[0].data : 0,
        backgroundColor: color,
      }
    ]
  }

  return <Bar options={options} data={data} />;
}


export default ChartCom;