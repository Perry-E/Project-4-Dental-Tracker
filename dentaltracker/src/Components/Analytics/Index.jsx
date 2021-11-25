import React from "react";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";
// import { format } from "date-fns";
// import BarChart from "./BarChart";
// import { LineChart } from "./LineChart";
// import PieChart from "./PieChart";
// import FullWidthTabs from "./Tab";
import BasicTabs from "./AnalyticsTab";

export default function Analytics() {
  const currentUser = useAuth();
  const [procedureData, setProcedureData] = useState([]);
  // const [month, setMonth] = useState();
  // const [year, setYear] = useState();

  // console.log("YEAR", year);
  // console.log("MONTH", month);

  useEffect(() => {
    let procedureArray = [];
    async function allProcedures() {
      const procedureSubcollection = await getDocs(
        collection(db, "users", `${currentUser?.uid}`, "procedures")
      );
      procedureSubcollection?.forEach((doc) => {
        procedureArray?.push(doc.data());
      });
      setProcedureData(procedureArray);
    }
    allProcedures();
  }, [currentUser?.uid]);
  console.log("PROCEDUREDATA", procedureData);

  return (
    <>
      <BasicTabs data={procedureData}/>
    </>
  );
}
