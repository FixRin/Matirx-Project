"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Chart configuration
    setChartOptions({
      responsive: true,

      plugins: {
        legend: {
          position: "top",
        },
      },
    });

    // Sample data
    setChartData({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sales 2023",
          data: [65, 59, 80, 81, 56, 55, 72],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Sales 2022",
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, []);

  return (
    <div className="w-full h-full flex  justify-start">
      {chartData.datasets.length > 0 && (
        <Line className="w-full" options={chartOptions} data={chartData} />
      )}
    </div>
  );
}
