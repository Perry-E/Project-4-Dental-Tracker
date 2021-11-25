import React from "react";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";
import BasicTabs from "./AnalyticsTab";

export default function Analytics() {
  const currentUser = useAuth();
  const [procedureData, setProcedureData] = useState([]);

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

  return (
    <>
      <BasicTabs data={procedureData} />
    </>
  );
}
