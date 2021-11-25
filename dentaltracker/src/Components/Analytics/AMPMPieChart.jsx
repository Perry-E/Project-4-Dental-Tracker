import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AMPMPieChart({ filteredAM, filteredPM }) {
  const data = {
    labels: ["AM Sessions", "PM Sessions"],
    datasets: [
      {
        label: "Number of procedures in the mornings vs afternoons",
        data: [filteredAM.length, filteredPM.length],
        backgroundColor: ["rgba(255, 159, 64, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 159, 64, 1)", "rgba(54, 162, 235, 1)"],
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
        text: "Number of procedures in the mornings vs afternoons",
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "50vh", width: "70vw" }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}
