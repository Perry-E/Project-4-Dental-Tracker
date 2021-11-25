import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login, resetPassword, useAuth } from "../../firebase";

export default function ForgotPassword() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const currentUser = useAuth();
  console.log("LOGIN 1 CURRENT USER", currentUser);

  let navigate = useNavigate();

  async function handleReset(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email inbox for further instructions!");
      //   navigate("/login");
    } catch {
      setError("Failed To Reset Password");
    }
    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          {/* center text, margin bottom */}
          <h2 className="text-center mb-4">Password Reset</h2>
          {/* <div>Currently logged in as: {currentUser?.email}</div> */}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            {/* <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group> */}
            {/* <Link to="/dashboard"> */}
            <Button
              disabled={loading || currentUser}
              onClick={handleReset}
              className="w-100 mt-4"
              type="submit"
              style={{
                backgroundColor: "#06d6a0",
                color: "#495057",
                border: "none",
              }}
            >
              Reset
            </Button>
            {/* </Link> */}
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
