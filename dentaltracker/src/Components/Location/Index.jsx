import { useEffect, useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import UpdateModal from "./UpdateModal";

export default function Location() {
  // const locationRef = useRef();
  // const sessionNameRef = useRef();
  // const startRef = useRef();
  // const endRef = useRef();
  // const commissionRef = useRef();

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // const [commission, setCommission] = useState("");

  const currentUser = useAuth();

  //! Create new location
  async function handleNew(e) {
    e?.preventDefault();
    const locationRef = collection(db, "users", currentUser?.uid, "location");
    await addDoc(
      locationRef,
      {
        locationName: location,
        sessionName: sessionName,
        start: start,
        end: end,
        // commission: commission,
      },
      { merge: true }
    );
    setLocation("");
    setSessionName("");
    setStart("");
    setEnd("");
    window.location.reload(false);
    // setCommission("");

    //! Create new procedure list
    //   const proceduresRef = collection(
    //     db,
    //     "users",
    //     currentUser?.uid,
    //     "procedures"
    //   );
    //   await addDoc(
    //     proceduresRef,
    //     {
    //       "Cons & Tx Planning Model": [
    //         { "consultation": 0 },
    //         { "review": 0 },
    //         { "review - facility": 0 },
    //         { "Diagnosis & Tx Planning": 0 },
    //         { "Special Material Cost Fee - 1": 0 },
    //         { "Special Material Cost Fee - 2": 0 },
    //         { "Special Material & Consumables": 0 },
    //       ],

    //       "Orthodontics Model": [
    //         { "Ortho Retainer": 0 },
    //         { "Removable Appliance Active": 0 },
    //         { "Adjustment - Appliance": 0 },
    //         { "Space Maintainer": 0 },
    //         { "Band Placement": 0 },
    //       ],
    //       "Periodontal Therapy": [
    //         { "Scaling/Root Planing -1": 0 },
    //         { "Scaling/Root Planing -2": 0 },
    //         { "Scaling/Root Planing -3": 0 },
    //         { "Polishing - 1": 0 },
    //         { "Polishing - 2": 0 },
    //         { "Desensitisation -1": 0 },
    //         { "Desensitisation -2": 0 },
    //       ],
    //       "O&M Surgery": [
    //         { "LA Extraction - 1": 0 },
    //         { "LA Extraction - 2": 0 },
    //         { "LA Extraction - 3": 0 },
    //         { "Minor Surgical Procedure -1": 0 },
    //         { "Minor Surgical Procedure -2": 0 },
    //         { "Wiring -1": 0 },
    //         { "Wiring -2": 0 },
    //       ],
    //       "Occlusal Therapy": [
    //         { "Appliance Therapy -1": 0 },
    //         { "Appliance Therapy -2": 0 },
    //         { "Appliance Therapy - Per Visit": 0 },
    //       ],
    //     },
    //     { merge: true }
    //   );
  }

  //! Shows User specific locations
  const [userLocations, setUserLocations] = useState([]);
  useEffect(() => {
    let locationArray = [];
    async function allLocations() {
      const locationSubcollection = await getDocs(
        collection(db, "users", `${currentUser?.uid}`, "location")
      );
      locationSubcollection?.forEach((doc) => {
        locationArray?.push({ ...doc.data(), id: doc.id });
        // console.log("DOC DATA", doc.data())
        // setUserLocations(doc.data())
        // console.log("LOCATION ARRAY", locationArray)
      });
      setUserLocations(locationArray);
    }
    allLocations();
  }, [currentUser?.uid]);
  // console.log("USER LOCATIONS", userLocations);
  //! Shows all locations
  // async function allLocations() {
  //   const locations = query(
  //     collectionGroup(db, "location"),
  //   // where("id", "==", "Hc9a4qbzHZCsLrenVvcm")
  //   );
  //   const querySnapshot = await getDocs(locations);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }
  // allLocations();

  const [modalShow, setModalShow] = useState(false);
  // const navigate = useNavigate();

  const handleDelete = async (id) => {
    const docRef = doc(db, "users", `${currentUser?.uid}`, "location", id);
    await deleteDoc(docRef);
    // navigate("/location")
    window.location.reload(false);
    // await deleteDoc(doc(db, "location", `${id}`))
  };

  const [selected, setSelected] = useState();

  const handleClick = (item) => {
    setModalShow(true);
    console.log("TARGET", item);
    setSelected(item);
  };
  console.log("SELECTED", selected);
  return (
    <>
      <div className="w-100" style={{ maxWidth: "400px", marginTop: "-250px" }}>
        <h3 className="text-center mb-4">Add New Location & Session</h3>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group id="location">
                <Form.Label>Name of Location:</Form.Label>
                <Form.Control
                  type="location"
                  // ref={locationRef}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="sessionName">
                <Form.Label>Session Name:</Form.Label>
                <Form.Control
                  type="sessionName"
                  // ref={sessionNameRef}
                  required
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="sessionTime">
                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                  type="time"
                  // ref={startRef}
                  required
                  onChange={(e) => setStart(e.target.value)}
                />
                <Form.Label>End Time:</Form.Label>
                <Form.Control
                  type="time"
                  // ref={endRef}
                  required
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group id="commission">
                <Form.Label>Commission Rate %</Form.Label>
                <Form.Control
                  type="commission"
                  ref={commissionRef}
                  required
                  onChange={(e) => setCommission(e.target.value)}
                />
              </Form.Group> */}
              <Link to="/location">
                <Button
                  // disabled={loading || currentUser}
                  onClick={() => {
                    //   handleSignup();
                    handleNew();
                  }}
                  className="w-100 mt-4"
                  type="submit"
                  style={{
                    backgroundColor: "#06d6a0",
                    color: "#495057",
                    border: "none",
                  }}
                >
                  Add
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div
        className="w-50 mx-3"
        style={{ maxWidth: "200px", textAlign: "center", marginTop: "-300px" }}
      >
        <h5 style={{ textDecoration: "underline" }}>Saved Locations</h5>
        {userLocations?.map((item, index) => {
          // console.log("ITEM", item);
          return (
            <div key={index}>
              {/* <Card
                style={{
                  backgroundColor: "#dee2e6",
                  color: "#495057",
                  border: "none",
                }}
                className="py-3 px-5 shadow-none"
              > */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClick(item);
                    }}
                    // onClick={() => setModalShow(true)}
                    // onClick={(console.log("ITEM ID", `${Object.values(item)}`))}
                    style={{
                      backgroundColor: "#dee2e6",
                      color: "#495057",
                      border: "none",
                      margin: "5px",
                      width: "200px",
                    }}
                    className="py-3 px-5 shadow-none"
                    item={item}
                  >
                    {item.locationName}
                  </Button>
                  <UpdateModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    item={item}
                    selected={selected}
                    // onClick={()=>{handleClick(item)}}
                    // ref={[locationRef, sessionNameRef, startRef, endRef]}
                    // currentUser={currentUser}
                  />
                </div>
                {/* </Card> */}
                <Button
                  href="#"
                  className="py-3 px-3 shadow-none"
                  onClick={() => {
                    handleDelete(`${item.id}`);
                  }}
                  style={{
                    margin: "5px 5px 5px 0px",
                    width: "40px",
                    backgroundColor: "rgba(255, 0, 0, 0)",
                    border: "none",
                  }}
                >
                  <DeleteIcon style={{ color: "black" }} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", bottom: "150px", left: "auto" }}>
        After saving your locations, head over to the{" "}
        <Link to="/dashboard">home page</Link> to input your completed
        procedures
      </div>
    </>
  );
}
