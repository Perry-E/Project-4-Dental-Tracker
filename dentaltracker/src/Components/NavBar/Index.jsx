import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeIcon from "@mui/icons-material/Home";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { logout, useAuth } from "../../firebase";

export default function ButtonAppBar() {
  const [loading, setLoading] = useState(false);

  const currentUser = useAuth();

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#2C3C47" }}>
        <Toolbar>
          <a
            href="/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HomeIcon />
            <Button color="inherit">Home</Button>
          </a>

          <a
            href="/analytics"
            style={{ textDecoration: "none", color: "white" }}
          >
            <AnalyticsIcon style={{ marginLeft: "35px" }} />
            <Button color="inherit">Analytics</Button>
          </a>
          <a href="/billing" style={{ textDecoration: "none", color: "white" }}>
            <LocalAtmIcon style={{ marginLeft: "35px" }} />
            <Button color="inherit">Billing</Button>
          </a>
          <a
            href="/location"
            style={{ textDecoration: "none", color: "white" }}
          >
            <PublicIcon style={{ marginLeft: "35px" }} />
            <Button color="inherit">Location</Button>
          </a>
          <a
            href="/settings"
            style={{ textDecoration: "none", color: "white" }}
          >
            <SettingsIcon style={{ marginLeft: "35px" }} />
            <Button color="inherit">Settings</Button>
          </a>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {!currentUser ? (
            <>
              <a
                href="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Log in</Button>
              </a>
              <a
                href="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Sign Up</Button>
              </a>
            </>
          ) : (
            <>
              <h6 className="mx-2">
                Welcome {currentUser && currentUser.email}
              </h6>
              <a
                href="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  disabled={loading || !currentUser}
                  onClick={handleLogout}
                  type="submit"
                  color="inherit"
                  style={{
                    backgroundColor: "#06d6a0",
                    color: "#495057",
                    border: "none",
                  }}
                >
                  Log Out
                </Button>
              </a>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
