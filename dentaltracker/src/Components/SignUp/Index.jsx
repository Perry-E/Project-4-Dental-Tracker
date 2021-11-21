import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signup, useAuth } from "../../firebase";

import { addDoc, collection } from "firebase/firestore";
import {db} from "../../firebase";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const currentUser = useAuth();

  async function handleSignup(e) {
    e?.preventDefault();
    setLoading(true);
    // try {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do Not Match");
    }
    await signup(emailRef.current.value, passwordRef.current.value);
    console.log("REFS", email, password, confirmPassword)
    console.log("CURRENT USER SIGN UP", currentUser?.email);
    // } catch {
    //   setError("Failed To Create An Account");
    // }
    setLoading(false);
  }
  
  // async function handleNew(e) {
  //   e?.preventDefault();
  //     await addDoc(collection(db, "users"), {
  //     "email": email,
  //     "password": password,
  //   });
  //   setEmail("")
  //   setPassword("")
  //   setConfirmPassword("")
  // }

  return (
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          {/* center text, margin bottom */}
          <h2 className="text-center mb-4">Sign Up</h2>
          <div>Currently logged in as: {currentUser?.email}</div>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <Link to="/location">
              <Button
                disabled={loading || currentUser}
                onClick={() => {
                  handleSignup();
                  // handleNew();
                }}
                className="w-100 mt-4"
                type="submit"
              >
                Sign Up
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
