import { doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../firebase";

export default function UpdateModal(props) {
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
                  required
                  defaultValue={props?.selected?.locationName}
                  onChange={(e) => setLocation(e?.target?.value)}
                />
              </Form.Group>
              <Form.Group id="sessionName">
                <Form.Label>Session Name:</Form.Label>
                <Form.Control
                  type="sessionName"
                  required
                  onChange={(e) => setSessionName(e?.target?.value)}
                  defaultValue={props?.selected?.sessionName}
                />
              </Form.Group>
              <Form.Group id="sessionTime">
                <Form.Label>Start Time:</Form.Label>
                <Form.Control
                  type="time"
                  required
                  onChange={(e) => setStart(e?.target?.value)}
                />
                <Form.Label>End Time:</Form.Label>
                <Form.Control
                  type="time"
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

        <Button
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
      </Modal.Footer>
    </Modal>
  );
}
