import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, useAuth } from "../../firebase";
import { Link } from "react-router-dom";
import SummaryTab from "./SummaryTab";

export default function Summary() {
  const location = useLocation();
  const { data } = location?.state;

  const [consTx, setConsTx] = useState();
  const [orthodontics, setOrthodontics] = useState();
  const [periodontal, setPeriodontal] = useState();
  const [oAndM, setOAndM] = useState();
  const [occlusal, setOcclusal] = useState();
  useEffect(() => {
    setConsTx(data[0]["Cons & Tx Planning Model"]);
    setOrthodontics(data[1]["Orthodontics Model"]);
    setPeriodontal(data[2]["Periodontal Therapy"]);
    setOAndM(data[3]["O&M Surgery"]);
    setOcclusal(data[4]["Occlusal Therapy"]);
  }, [data]);

  const currentUser = useAuth();

  //! Shows User specific locations
  const [userLocations, setUserLocations] = useState([]);
  useEffect(() => {
    let locationArray = [];
    async function allLocations() {
      const locationSubcollection = await getDocs(
        collection(db, "users", `${currentUser?.uid}`, "location")
      );
      locationSubcollection?.forEach((doc) => {
        locationArray?.push(doc.data());
      });
      setUserLocations(locationArray);
    }
    allLocations();
  }, [currentUser?.uid]);

  //! filtered consTx
  const consTxFiltered = consTx?.filter((item) => {
    return item.checked === true;
  });
  const consTxData = { "Cons & Tx Planning Model": consTxFiltered };

  //! filtered orthodontics
  const orthoFiltered = orthodontics?.filter((item) => {
    return item.checked === true;
  });
  const orthoData = { "Orthodontics Model": orthoFiltered };

  //! filtered periodontal
  const periodFiltered = periodontal?.filter((item) => {
    return item.checked === true;
  });
  const periodData = { "Periodontal Therapy": periodFiltered };

  //! filtered O&M Surgery
  const oAndMFiltered = oAndM?.filter((item) => {
    return item.checked === true;
  });
  const oAndMData = { "O&M Surgery": oAndMFiltered };

  //! filtered Occlusal Therapy
  const occlusalFiltered = occlusal?.filter((item) => {
    return item.checked === true;
  });
  const occlusalData = { "Occlusal Therapy": occlusalFiltered };

  //! All selected data
  let selectedData = [];
  selectedData.push(consTxData, orthoData, periodData, oAndMData, occlusalData);

  const [charged, setCharged] = useState();
  const [commission, setCommission] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [locationName, setLocationName] = useState();
  const [sessionName, setSessionName] = useState();

  //! Create new location
  async function handleNew(e) {
    e?.preventDefault();
    //! Create new procedure list
    const proceduresRef = collection(
      db,
      "users",
      `${currentUser?.uid}`,
      "procedures"
    );
    await addDoc(
      proceduresRef,
      {
        "Cons & Tx Planning Model": consTxData,
        "Orthodontics Model": orthoData,
        "Periodontal Therapy": periodData,
        "O&M Surgery": oAndMData,
        "Occlusal Therapy": occlusalData,
        Charged: charged,
        Commission: commission,
        Date: date,
        Time: time,
        Location: locationName,
        Session: sessionName,
      },
      { merge: true }
    );
  }

  const sessionsMap = userLocations.map((item) => {
    return item?.sessionName;
  });

  const withoutDupesSession = [...new Set(sessionsMap)];

  return (
    <div>
      <h5 style={{ textAlign: "center", marginTop: "-30px" }}>SUMMARY</h5>

      <SummaryTab
        consTxFiltered={consTxFiltered}
        orthoFiltered={orthoFiltered}
        periodFiltered={periodFiltered}
        oAndMFiltered={oAndMFiltered}
        occlusalFiltered={occlusalFiltered}
      />

      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div>
          Charged Fee ($SGD):{" "}
          <Form.Group id="fee">
            <Form.Control
              type="number"
              required
              onChange={(e) => setCharged(e.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          Commission Rate (%):
          <Form.Group id="rate">
            <Form.Control
              type="number"
              required
              onChange={(e) => setCommission(e.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          Date:{" "}
          <Form.Group id="date">
            <Form.Control
              type="date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          Time:{" "}
          <Form.Group id="time">
            <Form.Control
              type="time"
              required
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          Location:{" "}
          <Form.Select
            id="location"
            onChange={(e) => setLocationName(e.target.value)}
          >
            <option>Select Location</option>
            {userLocations.map((item) => {
              return <option>{item.locationName}</option>;
            })}
          </Form.Select>
        </div>
        <div>
          Session:{" "}
          <Form.Select
            id="session"
            onChange={(e) => setSessionName(e.target.value)}
          >
            <option>Select Session</option>
            {withoutDupesSession?.map((item) => {
              return <option>{item}</option>;
            })}
          </Form.Select>
        </div>
        <div
          style={{
            textAlign: "center",
            margin: "25px",
          }}
        >
          <Link to="/billing">
            <Button
              type="submit"
              style={{
                backgroundColor: "#06d6a0",
                color: "#495057",
                border: "none",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
              onClick={() => handleNew()}
            >
              Submit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
