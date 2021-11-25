import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payments Received (Commission)",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 10, 20, 10, 10, 10, 20, 30, 10, 20, 50],
        borderColor: "rgb(6, 214, 160)",
        backgroundColor: "rgb(6, 214, 160, 0.5)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "50vh", width: "70vw" }}
    >
      <Line options={options} data={data} />
    </div>
  );
}
