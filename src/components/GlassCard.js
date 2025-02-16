import React from 'react';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet-async';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GlassCard = ({ icon, title, children }) => {
  // Function to generate date labels for the past 7 days
  const generateDateLabels = () => {
    const today = new Date();
    const labels = [];
    for (let i = 6; i >= 0; i--) {
      const previousDate = new Date(today);
      previousDate.setDate(today.getDate() - i);
      const month = previousDate.toLocaleString('default', { month: 'short' });
      const day = previousDate.getDate();
      labels.push(`${month} ${day}`);
    }
    return labels;
  };

  const labels = generateDateLabels();

  // Generate random ascending data starting from at least 47
  const generateAscendingData = () => {
    let data = [];
    let lastValue = 47 + Math.floor(Math.random() * 20); // Start with a value between 47 and 66
    for (let i = 0; i < 7; i++) {
      lastValue += Math.floor(Math.random() * 10); // Increment randomly
      data.push(lastValue);
    }
    return data;
  };

  const data = generateAscendingData();
  const lastValue = data[data.length - 1];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        borderColor: 'rgba(255, 136, 0, 1)',
        backgroundColor: 'rgba(255, 136, 0, 1)',
        pointBackgroundColor: 'rgba(255, 136, 0, 1)',
        pointBorderColor: 'rgba(255, 136, 0, 1)',
        pointHoverBackgroundColor: 'rgba(255, 136, 0, 1)',
        pointHoverBorderColor: 'rgba(255, 136, 0, 1)',
        data: data,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'rgba(255, 136, 0, 1)', // Set the legend text color to white
        },
      },
      title: {
        display: false,
        color: 'rgba(255, 136, 0, 1)', // Set the title text color to white
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
        },
      },
    },
  };

  return (
    <div>
      <Helmet>
        <meta name="description" content="Discover how Zimapeak Marketing generates leads through effective Google Ads, Facebook Ads, and other paid advertising strategies." />
        <meta name="keywords" content="Google Ads, Facebook Ads, Paid Ads, Digital Marketing, Lead Generation, Zimapeak Marketing" />
        <link rel="canonical" href="https://www.zimapeak.com/marketing" />
      </Helmet>
      <div className="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl flex flex-col items-center justify-center text-center w-full md:h-72">
        <div className="mb-2 text-3xl">{icon}</div>
        <h3 className="font-bold mb-1 text-lg">{title}</h3>
        <p className="text-xl">{`Leads generated today: ${lastValue}`}</p>
        <div className="w-full h-40 relative">
          <Line data={chartData} options={options} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
