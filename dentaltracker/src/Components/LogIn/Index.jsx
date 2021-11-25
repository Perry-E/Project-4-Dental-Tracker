import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login, useAuth } from "../../firebase";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUser = useAuth();
  console.log("LOGIN 1 CURRENT USER", currentUser);

  let navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("CURRENT USER LOGIN", currentUser?.email);
      navigate("/dashboard")
    } catch {
      setError("Failed To Log In, Try Again!");
    }
    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px", marginTop: "-200px", }} >
      <Card>
        <Card.Body>
          {/* center text, margin bottom */}
          <h2 className="text-center mb-4">Log In</h2>
          {/* <div>Currently logged in as: {currentUser?.email}</div> */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            {/* <Link to="/dashboard"> */}
              <Button
                disabled={loading || currentUser}
                onClick={handleLogin}
                className="w-100 mt-4"
                type="submit"
                style={{
                  backgroundColor: "#06d6a0",
                  color: "#495057",
                  border: "none",
                }}
              >
                Log In
              </Button>
            {/* </Link> */}
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

//   async function handleSignup(e) {
//     e.preventDefault();
//     setLoading(true);
//     // try {
//     //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//     //     return setError("Passwords Do Not Match");
//     //   }
//       await login(emailRef.current.value, passwordRef.current.value);
//     // } catch {
//     //   setError("Failed To Create An Account");
//     // }
//     setLoading(false);
//   }

// async function handleLogout() {
//     setLoading(true);
//     try {
//         await logout();
//     } catch {
//         alert("Error!");
//     }
//     setLoading(false);
// }

//   <div id="fields">
//     <input ref={emailRef} placeholder="Email" />
//     <input ref={passwordRef} type="password" placeholder="Password" />
//     <input
//     ref={passwordConfirmRef}
//     type="password"
//     placeholder="Password Confirmation"
//     />
//     </div>

//     <Button disabled={loading || currentUser} onClick={handleSignup}>
//     Sign Up
//     </Button>
//     <Button disabled={loading || currentUser} onClick={handleLogin}>
//     Log In
//     </Button>
//     <Button disabled={loading || !currentUser} onClick={handleLogout}>
//     Log Out
// </Button>
