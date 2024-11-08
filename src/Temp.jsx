import "./Temp.css";
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureGraph = ({ temperatureData, labels }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°F)',
                data: temperatureData,
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  
                borderWidth: 3,  
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',  
                pointBorderColor: 'rgba(255, 99, 132, 1)',  
                pointBorderWidth: 2,  
                pointRadius: 4,  
                pointStyle: 'Rounded',  
                tension: 0.4, 
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'black',  // Legend text color
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: 'Temperature Trend',
                color: 'black',  // Title color
                font: {
                    size: 18,
                },
            },
        },
        layout: {
            padding: {
                left: 50,
                right: 50,
            },
        },
        scales: {
            x: {
                type: 'category',
                offset: true,
                ticks: {
                    align: 'center',
                    color: 'black',  // X-axis tick color
                    font: {
                        size: 12,
                        weight: 600,
                    },
                },
                grid: {
                    color: 'black', 

                },
            },
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    color: 'black',  // Y-axis tick color
                    font: {
                        size: 12,
                        weight: 600,
                    },
                },
                grid: {
                    color: 'lightgrey',  // Y-axis grid line color
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default TemperatureGraph;