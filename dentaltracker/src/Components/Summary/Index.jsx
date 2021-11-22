import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, useAuth } from "../../firebase";
import { Link } from "react-router-dom";

export default function Summary() {
  const location = useLocation();
  const { data } = location?.state;
  console.log("data", data);

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
  //   console.log("CONSTX", consTx)
  //   console.log("orthodontics", orthodontics)
  //   console.log("periodontal", periodontal)
  //   console.log("oAndM", oAndM)
  //   console.log("occlusal", occlusal)

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
  console.log("USER LOCATIONS", userLocations);

  //! filtered consTx
  const consTxFiltered = consTx?.filter((item) => {
    return item.checked === true;
  });
  console.log("consTxFiltered", consTxFiltered);
  const consTxData = { "Cons & Tx Planning Model": consTxFiltered };
  console.log("constxdata", consTxData);

  //! filtered orthodontics
  const orthoFiltered = orthodontics?.filter((item) => {
    return item.checked === true;
  });
  console.log("orthoFiltered", orthoFiltered);
  const orthoData = { "Orthodontics Model": orthoFiltered };
  console.log("orthoData", orthoData);

  //! filtered periodontal
  const periodFiltered = periodontal?.filter((item) => {
    return item.checked === true;
  });
  console.log("periodFiltered", periodFiltered);
  const periodData = { "Periodontal Therapy": periodFiltered };
  console.log("periodData", periodData);
  
  //! filtered O&M Surgery
  const oAndMFiltered = oAndM?.filter((item) => {
    return item.checked === true;
  });
  console.log("oAndMFiltered", oAndMFiltered);
  const oAndMData = { "O&M Surgery": oAndMFiltered };
  console.log("oAndMData", oAndMData);

  //! filtered Occlusal Therapy
  const occlusalFiltered = occlusal?.filter((item) => {
    return item.checked === true;
  });
  console.log("occlusalFiltered", occlusalFiltered);
  const occlusalData = { "Occlusal Therapy": occlusalFiltered };
  console.log("occlusalData", occlusalData);

  //! All selected data
  let selectedData = [];
  selectedData.push(consTxData, orthoData, periodData, oAndMData, occlusalData);
  console.log("selectedData", selectedData);

  //   const [selectedData, setSelectedData] = useState([])
  //   useEffect(()=>{
  //       setSelectedData([consTxData, orthoData, periodData, oAndMData, occlusalData])
  //   },[])
  //   console.log("SELECTEDDATA", selectedData)

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
      currentUser?.uid,
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

  return (
    <div>
      <h1>SUMMARY</h1>
      <h4>Cons & Tx Planning Model</h4>
      {consTxFiltered?.map((item) => {
        return <div>{item.name}</div>;
      })}

      <h4>Orthodontics Model</h4>
      {orthoFiltered?.map((item) => {
        return <div>{item.name}</div>;
      })}

      <h4>Periodontal Therapy</h4>
      {periodFiltered?.map((item) => {
        return <div>{item.name}</div>;
      })}

      <h4>O&M Surgery</h4>
      {oAndMFiltered?.map((item) => {
        return <div>{item.name}</div>;
      })}

      <h4>Occlusal Therapy</h4>
      {occlusalFiltered?.map((item) => {
        return <div>{item.name}</div>;
      })}

      <h5>Charged Fee</h5>
      <div>
        $SGD{" "}
        <Form.Group id="fee">
          <Form.Control
            type="number"
            required
            onChange={(e) => setCharged(e.target.value)}
          />
        </Form.Group>
      </div>
      <div>
        Commission Rate:
        <Form.Group id="rate">
          <Form.Control
            type="number"
            required
            onChange={(e) => setCommission(e.target.value)}
          />
        </Form.Group>
        %
      </div>
      <div>
        Date & Day{" "}
        <Form.Group id="date">
          <Form.Control
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
      </div>
      <div>
        Time{" "}
        <Form.Group id="time">
          <Form.Control
            type="time"
            required
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
      </div>
      <div>
        Location{" "}
        <Form.Select
          id="location"
          onChange={(e) => setLocationName(e.target.value)}
        >
            {userLocations.map((item)=>{
                return(
                    <option>{item.locationName}</option>
                )
            })}
        </Form.Select>
      </div>
      <div>
        Session{" "}
        <Form.Select
          id="session"
          onChange={(e) => setSessionName(e.target.value)}
        >
            {userLocations.map((item)=>{
                return(
                    <option>{item.sessionName}</option>
                )
            })}
        </Form.Select>
      </div>
      <Link to="/billing">
      <Button
        type="submit"
        style={{ backgroundColor: "#06d6a0", color: "#495057", border: "none" }}
        onClick={()=>handleNew()}
      >
        Submit
      </Button>
      </Link>
    </div>
  );
}
