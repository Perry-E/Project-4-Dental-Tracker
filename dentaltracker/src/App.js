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