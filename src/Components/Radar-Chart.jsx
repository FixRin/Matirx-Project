"use client"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import { Radar } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function TrafficSourcesChart() {
  // Define chart data
  const data = {
    labels: ["Organic Search", "Direct", "Social Media", "Email", "Referral", "Paid Search"],
    datasets: [
      {
        label: "Current Month",
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 4,
      },
      {
        label: "Previous Month",
        data: [28, 48, 40, 19, 96, 27],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        pointRadius: 4,
      },
      {
        label: "Last Year",
        data: [42, 38, 60, 65, 50, 70],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 4,
      },
    ],
  }

  // Chart options
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
          color: "#666",
          font: {
            size: 10,
          },
        },
        pointLabels: {
          font: {
            size: 12,
            weight: "500",
          },
          color: "#333",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          title: (items) => {
            if (!items.length) return ""
            const item = items[0]
            return data.labels[item.dataIndex]
          },
          label: (context) => {
            const label = context.dataset.label || ""
            const value = context.raw || 0
            return `${label}: ${value}k visitors`
          },
        },
      },
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.2, // Smoother lines
      },
    },
  }

  return (
    <div className="w-full h-[250px]">
      <Radar data={data} options={options} />
    </div>
  )
}
