import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Cons & Tx Planning Model",
    "Orthodontics Model",
    "Periodontal Therapy",
    "O&M Surgery",
    "Occlusal Therapy",
  ],
  datasets: [
    {
      label: "Number of procedures per category (Per Month)",
      data: [12, 19, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        // 'rgba(255, 206, 86, 0.2)',
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        // 'rgba(255, 206, 86, 1)',
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Number of procedures per category (Per Month)",
    },
  },
};

export default function PieChart() {
  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "50vh", width: "70vw" }}
    >
      <Pie data={data} options={options} />;
    </div>
  );
}
