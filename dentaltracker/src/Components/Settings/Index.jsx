import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../firebase";
import { updateEmail, updatePassword } from "firebase/auth";

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

  const currentUser = useAuth();
  console.log("CURRENTUSER", currentUser);

  function handleUpdate(e) {
    e.preventDefault();
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
        });
    }
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px", marginTop: "-250px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
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
            <Button
              disabled={loading}
              onClick={handleUpdate}
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
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Cancel</Link>
      </div>
    </div>
  );
}
