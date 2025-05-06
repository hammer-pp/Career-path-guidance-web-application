import React from 'react';
import { Bar } from 'react-chartjs-2';
import styles from '../styles/TestPage.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = ({ title, data }) => {
  // เพิ่มการตรวจสอบว่า data เป็น null หรือ undefined
  if (!data) {
    return <div className={styles.chartContainer}>กำลังโหลดข้อมูล...</div>;
  }

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'คะแนน (%)',
        data: Object.values(data),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw + '%';
          }
        }
      }
    },
    scales: {
      x: {
        max: 100,
        min: 0
      }
    }
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartWrapper}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;