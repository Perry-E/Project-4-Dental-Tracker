import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function Settings() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const auth = getAuth();
  const currentUser = useAuth();
  console.log("CURRENTUSER", currentUser);
  let navigate = useNavigate();

  //   updateEmail(auth.currentUser, email).then(() => {
  //     setMessage("Email Successfully Updated")
  //   }).catch((error) => {
  //     setError("Failed to update Email");
  //     console.log(error)
  //   });

  // updatePassword(auth.currentUser, password).then(() => {
  //   setMessage("Password Successfully Updated")
  // }).catch((error) => {
  //   setError("Failed to update Password");
  //     console.log(error)
  // });

  function handleUpdate(e) {
    e.preventDefault();
    // if (passwordRef.current.value !== passwordConfirmRef.current.value)
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (email !== currentUser.email) {
      updateEmail(currentUser, email)
        .then(() => {
          setMessage("Email Successfully Updated");
        })
        .catch((error) => {
          setError(
            "Failed to update, please log in and try again. (Re-authenticate)"
          );
          console.log(error);
        });
    }
    if (password) {
      updatePassword(currentUser, password)
        .then(() => {
          setMessage("Password Successfully Updated");
        })
        .catch((error) => {
          setError("Failed to update Password");
          // setError(error);
        });
    }
    // window.location.reload(false);
    // const promises = [];
    // setLoading(true);
    // setError("");
    // if (email !== currentUser.email) {
    //   promises.push(updateEmail(email));
    // }
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(password));
    // }
    // Promise.all(promises)
    //   .then(() => {
    //     navigate("/dashboard");
    //   })
    //   .catch(() => {
    //     setError("Failed to update account");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  console.log("PASSWORD", password);
  console.log("CONFIRM PASSWORD", confirmPassword);

  return (
    <div className="w-100" style={{ maxWidth: "400px", marginTop: "-250px" }}>
      <Card>
        <Card.Body>
          {/* center text, margin bottom */}
          <h2 className="text-center mb-4">Update Profile</h2>
          {/* <div>Currently logged in as: {currentUser?.email}</div> */}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={currentUser?.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            {/* <Link to="/location"> */}
            <Button
              disabled={loading}
              onClick={
                handleUpdate
                // handleNew();
              }
              className="w-100 mt-4"
              type="submit"
              style={{
                backgroundColor: "#06d6a0",
                color: "#495057",
                border: "none",
              }}
            >
              Update
            </Button>
            {/* </Link> */}
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Cancel</Link>
      </div>
    </div>
  );
}
