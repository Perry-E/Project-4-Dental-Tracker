import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart(props) {
  console.log("PROPS", props);

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
        label: "Payments",
        data: [10, 20, 10, 20, 10, 10, 10, 20, 30, 10, 20, 50],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgb(6, 214, 160, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(6, 214, 160)",
        ],
        borderWidth: 1,
      },
      //   {
      //     label: 'Dataset 2',
      //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //   },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "50vh", width: "70vw" }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}

//!AM PM Difference??