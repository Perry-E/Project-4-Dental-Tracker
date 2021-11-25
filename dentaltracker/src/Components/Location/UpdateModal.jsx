import { setDoc, collection, doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";

export default function UpdateModal(props) {
  console.log("UPDATE PROPS", props);
  const currentUser = useAuth();

  const [location, setLocation] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleUpdate = async () => {
    const docRef = doc(
      db,
      "users",
      `${currentUser?.uid}`,
      "location",
      `${props.selected.id}`
    );
    await updateDoc(docRef, {
      locationName: location,
      sessionName: sessionName,
      start: start,
      end: end,
    });
    window.location.reload(false);
  };

  //! Create new location
  //   async function handleUpdate(e) {
  //     e?.preventDefault();
  //     const locationRef = collection(db, "users", props.currentUser?.uid, "location");
  //     await setDoc(
  //       locationRef,
  //       {
  //         locationName: location,
  //         sessionName: sessionName,
  //         start: start,
  //         end: end,
  //         // commission: commission,
  //       },
  //       { merge: true }
  //     );
  //     // setLocation("");
  //     // setSessionName("");
  //     // setStart("");
  //     // setEnd("");
  //     // setCommission("");
  //   }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group id="location">
                <Form.Label>Name of Location:</Form.Label>
                <Form.Control
                  type="location"
                  //   ref={props.locationRef}
                  required
                  defaultValue={props?.selected?.locationName}
                  onChange={(e) => setLocation(e?.target?.value)}
                />
              </Form.Group>
              <Form.Group id="sessionName">
                <Form.Label>Session Name:</Form.Label>
                <Form.Control
                  type="sessionName"
                  //   ref={props.sessionNameRef}
                  required
                  onChange={(e) => setSessionName(e?.target?.value)}
                  defaultValue={props?.selected?.sessionName}
                />
              </Form.Group>
              <Form.Group id="sessionTime">
                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                  type="time"
                  //   ref={props.startRef}
                  required
                  onChange={(e) => setStart(e?.target?.value)}
                />
                <Form.Label>End Time:</Form.Label>
                <Form.Control
                  type="time"
                  //   ref={props.endRef}
                  required
                  onChange={(e) => setEnd(e?.target?.value)}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          {" "}
          Close
        </Button>
        {/* <Link to="/location"> */}
        <Button
          //   onClick={props.onHide}
          onClick={() => {
            handleUpdate();
          }}
          style={{
            backgroundColor: "#06d6a0",
            color: "#495057",
            border: "none",
          }}
        >
          Save Changes
        </Button>
        {/* </Link> */}
        {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
      </Modal.Footer>
    </Modal>
  );
}
