import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProceduresPieChart({ procedures }) {
  console.log("PIECHART PROPS CATEGRORIES", procedures);

  let numConsTx = 0;
  const consTx = procedures.filter((item) => {
    return (
      item["Cons & Tx Planning Model"]["Cons & Tx Planning Model"].length > 0
    );
  });
  // console.log("CONSTX", consTx)
  numConsTx = consTx.length;
  // console.log("NUMCONSTX", numConsTx)

  let numOrtho = 0;
  const ortho = procedures.filter((item) => {
    return item["Orthodontics Model"]["Orthodontics Model"].length > 0;
  });
  // console.log("ortho", ortho)
  numOrtho = ortho.length;
  // console.log("NUMortho", numOrtho)

  let numPeriod = 0;
  const period = procedures.filter((item) => {
    return item["Periodontal Therapy"]["Periodontal Therapy"].length > 0;
  });
  // console.log("period", period)
  numPeriod = period.length;
  // console.log("NUMperiod", numPeriod)

  let numOandM = 0;
  const oAndM = procedures.filter((item) => {
    return item["O&M Surgery"]["O&M Surgery"].length > 0;
  });
  // console.log("oAndM", oAndM)
  numOandM = oAndM.length;
  // console.log("NUMOANDM", numOandM)

  let numOcclusal = 0;
  const occlusal = procedures.filter((item) => {
    return item["Occlusal Therapy"]["Occlusal Therapy"].length > 0;
  });
  // console.log("occlusal", occlusal)
  numOcclusal = occlusal.length;
  // console.log("NUMocclusal", numOcclusal)

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
        data: [numConsTx, numOrtho, numPeriod, numOandM, numOcclusal],
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
        text: "Number of procedures per category",
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{ position: "relative", height: "50vh", width: "70vw" }}
    >
      <Pie data={data} options={options} />;
    </div>
  );
}
