import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, useAuth } from "../../firebase";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TableContainer } from "@mui/material";
import DashboardTab from "./DashboardTab";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState([]);

  const currentUser = useAuth();
  // console.log("CurrentUser", currentUser?.uid);
  useEffect(() => {
    const userQuery = query(collection(db, "users"));
    const userUnsub = onSnapshot(userQuery, (querySnapshot) => {
      let userArray = [];
      querySnapshot.forEach((doc) => {
        userArray.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userArray);
    });
    return () => {
      userUnsub();
      // totalUnsub();
    };
  }, []);
  // console.log("USERS", users);
  // console.log("TOTAL", totalCompleted);

  //! //////////////////////////////////////////////////////////////////
  const [show, setShow] = useState(false);
  const [filterName, setFilterName] = useState();

  const filteredValues = Object.keys(totalCompleted).filter((key) => {
    return key === filterName;
  });

  // console.log("FILTERNAME", filterName);
  //! //////////////////////////////////////////////////////////////////

  // const [userLocations, setUserLocations] = useState([]);
  // const [userProcedures, setUserProcedures] = useState([]);

  // useEffect(() => {
  //   //! Shows User specific locations

  //   async function allLocations() {
  //     // console.log("GETDOCS", getDocs)
  //     const locationsSubcollection = await getDocs(
  //       collection(db, "users", `${currentUser?.uid}`, "location")
  //     );
  //     let locationArray = [];
  //     locationsSubcollection?.forEach((doc) => {
  //       locationArray.push(doc.data());
  //       setUserLocations(locationArray);
  //     });
  //   }
  //   allLocations();

  //   //! Shows User specific procedures
  //   async function allProcedures() {
  //     const proceduresSubcollection = await getDocs(
  //       collection(db, "users", `${currentUser?.uid}`, "procedures")
  //     );
  //     let proceduresArray = [];
  //     proceduresSubcollection?.forEach((doc) => {
  //       proceduresArray.push(doc.data());
  //       // console.log("PROCEDURES ARRAY", proceduresArray);
  //       setUserProcedures(proceduresArray[0]);
  //     });
  //   }
  //   allProcedures();
  // }, [currentUser?.uid]);

  const [consTx, setConsTx] = useState({
    "Cons & Tx Planning Model": [
      { id: 1, name: "Consultation", checked: false },
      { id: 2, name: "Review", checked: false },
      { id: 3, name: "Review - facility", checked: false },
      { id: 4, name: "Diagnosis & Tx Planning", checked: false },
      { id: 5, name: "Special Material Cost Fee - 1", checked: false },
      { id: 6, name: "Special Material Cost Fee - 2", checked: false },
      { id: 7, name: "Special Material & Consumables", checked: false },
    ],
  });
  // console.log("CONSTX", consTx);

  const toggleConsTx = (id) => {
    // console.log("IDIDID", id);
    // loop over the consTx list and find the provided id.
    let updatedList = consTx["Cons & Tx Planning Model"].map((item) => {
      // console.log("ITEMITEM", item);
      if (item.id === id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    setConsTx({ "Cons & Tx Planning Model": updatedList }); // set state to new object with updated list
  };

  const [orthodontics, setOrthodontics] = useState({
    "Orthodontics Model": [
      { id: 1, name: "Ortho Retainer", checked: false },
      { id: 2, name: "Removable Appliance Active", checked: false },
      { id: 3, name: "Adjustment - Appliance", checked: false },
      { id: 4, name: "Space Maintainer", checked: false },
      { id: 5, name: "Band Placement", checked: false },
    ],
  });
  // console.log("ORTHODONTICS", orthodontics["Orthodontics Model"]);
  const toggleOrtho = (id) => {
    // console.log("IDIDID", id);
    // loop over the consTx list and find the provided id.
    let updatedList = orthodontics["Orthodontics Model"].map((item) => {
      // console.log("ITEMITEM", item);
      if (item.id === id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });

    setOrthodontics({ "Orthodontics Model": updatedList }); // set state to new object with updated list
  };

  const [periodontal, setPeriodontal] = useState({
    "Periodontal Therapy": [
      { id: 1, name: "Scaling/Root Planing -1", checked: false },
      { id: 2, name: "Scaling/Root Planing -2", checked: false },
      { id: 3, name: "Scaling/Root Planing -3", checked: false },
      { id: 4, name: "Polishing - 1", checked: false },
      { id: 5, name: "Polishing - 2", checked: false },
      { id: 6, name: "Desensitisation -1", checked: false },
      { id: 7, name: "Desensitisation -2", checked: false },
    ],
  });
  // console.log("Periodontal", periodontal["Periodontal Therapy"]);

  const togglePeriod = (id) => {
    // console.log("IDIDID", id);
    // loop over the consTx list and find the provided id.
    let updatedList = periodontal["Periodontal Therapy"].map((item) => {
      // console.log("ITEMITEM", item);
      if (item.id === id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });
    setPeriodontal({ "Periodontal Therapy": updatedList }); // set state to new object with updated list
  };

  const [oAndM, setOAndM] = useState({
    "O&M Surgery": [
      { id: 1, name: "LA Extraction - 1", checked: false },
      { id: 2, name: "LA Extraction - 2", checked: false },
      { id: 3, name: "LA Extraction - 3", checked: false },
      { id: 4, name: "Minor Surgical Procedure -1", checked: false },
      { id: 5, name: "Minor Surgical Procedure -2", checked: false },
      { id: 6, name: "Wiring -1", checked: false },
      { id: 7, name: "Wiring -2", checked: false },
    ],
  });
  // console.log("O&M SURGERY", oAndM["O&M Surgery"]);
  const toggleOAndM = (id) => {
    // console.log("IDIDID", id);
    // loop over the consTx list and find the provided id.
    let updatedList = oAndM["O&M Surgery"].map((item) => {
      // console.log("ITEMITEM", item);
      if (item.id === id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });
    setOAndM({ "O&M Surgery": updatedList }); // set state to new object with updated list
  };

  const [occlusal, setOcclusal] = useState({
    "Occlusal Therapy": [
      { id: 1, name: "Appliance Therapy -1", checked: false },
      { id: 2, name: "Appliance Therapy -2", checked: false },
      { id: 3, name: "Appliance Therapy - Per Visit", checked: false },
    ],
  });
  // console.log("O&M SURGERY", occlusal["Occlusal Therapy"]);
  const toggleOcclusal = (id) => {
    // console.log("IDIDID", id);
    // loop over the consTx list and find the provided id.
    let updatedList = occlusal["Occlusal Therapy"].map((item) => {
      // console.log("ITEMITEM", item);
      if (item.id === id) {
        return { ...item, checked: !item.checked }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item
    });
    setOcclusal({ "Occlusal Therapy": updatedList }); // set state to new object with updated list
  };

  const [totalProcedures, setTotalProcedures] = useState();
  useEffect(() => {
    setTotalProcedures([consTx, orthodontics, periodontal, oAndM, occlusal]);
  }, [consTx, orthodontics, periodontal, oAndM, occlusal]);
  console.log("TOTAL PROCEDURES", totalProcedures);

  return (
    <div style={{ marginTop: "-200px" }}>
      <h4 className="text-center mb-4">Treatment/Procedure</h4>
      {/* <TableContainer>
        <Button
          style={{
            backgroundColor: "#dee2e6",
            color: "#495057",
            border: "none",
          }}
          className="w-100 mt-3 py-3 shadow-none"
          onClick={() => {
            setShow(!show);
          }}
        >
          Cons & Tx Planning Model
        </Button>
        {consTx["Cons & Tx Planning Model"]?.map((item, index) => {
          // console.log("CONSTX", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => toggleConsTx(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}

        <Button
          style={{
            backgroundColor: "#dee2e6",
            color: "#495057",
            border: "none",
          }}
          className="w-100 mt-3 py-3 shadow-none"
          onClick={() => {
            setShow(!show);
          }}
        >
          Orthodontics Model
        </Button>
        {orthodontics["Orthodontics Model"]?.map((item, index) => {
          // console.log("CONSTX", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => toggleOrtho(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}

        <Button
          style={{
            backgroundColor: "#dee2e6",
            color: "#495057",
            border: "none",
          }}
          className="w-100 mt-3 py-3 shadow-none"
          onClick={() => {
            setShow(!show);
          }}
        >
          Periodontal Therapy
        </Button>
        {periodontal["Periodontal Therapy"]?.map((item, index) => {
          // console.log("CONSTX", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => togglePeriod(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}

        <Button
          style={{
            backgroundColor: "#dee2e6",
            color: "#495057",
            border: "none",
          }}
          className="w-100 mt-3 py-3 shadow-none"
          onClick={() => {
            setShow(!show);
          }}
        >
          O&M Surgery
        </Button>
        {oAndM["O&M Surgery"]?.map((item, index) => {
          // console.log("CONSTX", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => toggleOAndM(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}

        <Button
          style={{
            backgroundColor: "#dee2e6",
            color: "#495057",
            border: "none",
          }}
          className="w-100 mt-3 py-3 shadow-none"
          onClick={() => {
            setShow(!show);
          }}
        >
          Occlusal Therapy
        </Button>
        {occlusal["Occlusal Therapy"]?.map((item, index) => {
          // console.log("CONSTX", item);
          return (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  onClick={() => toggleOcclusal(item.id)}
                />{" "}
                {item.name}
              </label>
            </div>
          );
        })}
      </TableContainer>
      <TableContainer
        style={{ position: "relative", right: "-300px", top: "-250px" }}
      >
        {show && <div>{filteredValues}</div>}
      </TableContainer> */}
      <DashboardTab
        consTx={consTx}
        orthodontics={orthodontics}
        periodontal={periodontal}
        oAndM={oAndM}
        occlusal={occlusal}
        toggleConsTx={toggleConsTx}
        toggleOrtho={toggleOrtho}
        togglePeriod={togglePeriod}
        toggleOAndM={toggleOAndM}
        toggleOcclusal={toggleOcclusal}
      />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link to="summary" state={{ data: totalProcedures }}>
          {/* <Navigate to */}
          <Button
            style={{
              backgroundColor: "#06d6a0",
              color: "#495057",
              border: "none",
              maxWidth: "200px",
            }}
            className="w-100 mt-5 py-3"
            // onClick={()=>handleNew()}
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
