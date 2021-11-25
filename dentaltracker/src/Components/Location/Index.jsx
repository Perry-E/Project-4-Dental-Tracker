import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
  const [location, setLocation] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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
      },
      { merge: true }
    );
    setLocation("");
    setSessionName("");
    setStart("");
    setEnd("");
    window.location.reload(false);
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
      });
      setUserLocations(locationArray);
    }
    allLocations();
  }, [currentUser?.uid]);

  const [modalShow, setModalShow] = useState(false);

  const handleDelete = async (id) => {
    const docRef = doc(db, "users", `${currentUser?.uid}`, "location", id);
    await deleteDoc(docRef);
    window.location.reload(false);
  };

  const [selected, setSelected] = useState();

  const handleClick = (item) => {
    setModalShow(true);
    setSelected(item);
  };

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
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="sessionName">
                <Form.Label>Session Name:</Form.Label>
                <Form.Control
                  type="sessionName"
                  required
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="sessionTime">
                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                  type="time"
                  required
                  onChange={(e) => setStart(e.target.value)}
                />
                <Form.Label>End Time:</Form.Label>
                <Form.Control
                  type="time"
                  required
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Form.Group>
              <Link to="/location">
                <Button
                  onClick={() => {
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
          return (
            <div key={index}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClick(item);
                    }}
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
                  />
                </div>

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
