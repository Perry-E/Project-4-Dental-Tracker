import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Index";
import LogIn from "./Components/LogIn/Index";
import SignUp from "./Components/SignUp/Index";
import ButtonAppBar from "./Components/NavBar/Index";
import LogOut from "./Components/Logout/Index";
import Summary from "./Components/Summary/Index";
import Location from "./Components/Location/Index";
import Billing from "./Components/Billing/Index";
import Analytics from "./Components/Analytics/Index";
import Settings from "./Components/Settings/Index";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />

            <Route path="/login" element={<LogIn />} />

            <Route path="/logout" element={<LogOut />} />

            <Route path="/location" element={<Location />} />

            <Route path="/billing" element={<Billing />} />

            <Route path="/analytics" element={<Analytics />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/dashboard/summary" element={<Summary />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;

// import { useRef, useState } from "react";
// import { Card, Form, Button, Alert } from "react-bootstrap";
// import { signup, login, logout, useAuth } from "./firebase2";

// export default function App() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const passwordConfirmRef = useRef();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const currentUser = useAuth();

//   async function handleSignup(e) {
//     e.preventDefault();
//     setLoading(true);
//     // try {
//       if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//         return setError("Passwords Do Not Match");
//       }
//       await signup(emailRef.current.value, passwordRef.current.value);
//     // } catch {
//     //   setError("Failed To Create An Account");
//     // }
//     setLoading(false);
//   }

//   async function handleLogin() {
//     setLoading(true);
//     try {
//       await login(emailRef.current.value, passwordRef.current.value);
//     } catch {
//       alert("Error!");
//     }
//     setLoading(false);
//   }

//   async function handleLogout() {
//     setLoading(true);
//     try {
//       await logout();
//     } catch {
//       alert("Error!");
//     }
//     setLoading(false);
//   }

//   return (
//     <div>
//       <Card>
//         <Card.Body>
//           {/* center text, margin bottom */}
//           <h2 className="text-center mb-4">Sign Up</h2>
//           <div>Currently logged in as: {currentUser?.email}</div>
//           {error && <Alert variant="danger">{error}</Alert>}

//           <Form>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Password Confirmation</Form.Label>
//               <Form.Control type="password" ref={passwordConfirmRef} required />
//             </Form.Group>
//             <Button disabled={loading || currentUser} onClick={handleSignup} className="w-100 mt-4" type="submit">
//               Sign Up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>

//       {/* <div id="fields">
//         <input ref={emailRef} placeholder="Email" />
//         <input ref={passwordRef} type="password" placeholder="Password" />
//         <input
//           ref={passwordConfirmRef}
//           type="password"
//           placeholder="Password Confirmation"
//         />
//       </div>

//       <Button disabled={loading || currentUser} onClick={handleSignup}>
//         Sign Up
//       </Button>
//       <Button disabled={loading || currentUser} onClick={handleLogin}>
//         Log In
//       </Button>
//       <Button disabled={loading || !currentUser} onClick={handleLogout}>
//         Log Out
//       </Button> */}
//     </div>
//   );
// }
