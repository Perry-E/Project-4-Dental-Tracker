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

import { useAuth } from "./firebase";
import { Navigate } from "react-router";
import ForgotPassword from "./Components/ForgotPassword/Index";

function App() {
  function PrivateRoute({ children }) {
    const currentUser = useAuth();
    return currentUser !== null ? children : <Navigate to="/login" />;
  }

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

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/location"
              element={
                <PrivateRoute>
                  {" "}
                  <Location />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="/billing"
              element={
                <PrivateRoute>
                  {" "}
                  <Billing />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  {" "}
                  <Analytics />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  {" "}
                  <Settings />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  {" "}
                  <Dashboard />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard/summary"
              element={
                <PrivateRoute>
                  {" "}
                  <Summary />{" "}
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
