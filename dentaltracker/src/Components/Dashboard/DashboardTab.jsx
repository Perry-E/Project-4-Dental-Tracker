import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardTab(props) {
    console.log("TABSTABS", props)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Cons & Tx Planning Model" {...a11yProps(0)} />
          <Tab label="Orthodontics Model" {...a11yProps(1)} />
          <Tab label="Periodontal Therapy" {...a11yProps(2)} />
          <Tab label="O&M Surgery" {...a11yProps(3)} />
          <Tab label="Occlusal Therapy" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div
          className="chart-container my-5"
        >
            {props.consTx["Cons & Tx Planning Model"]?.map((item, index) => {
        //   console.log("CONSTX", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => props.toggleConsTx(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="chart-container my-5">
        {props.orthodontics["Orthodontics Model"]?.map((item, index) => {
        //   console.log("ORTHO", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => props.toggleOrtho(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="chart-container my-5">
        {props.periodontal["Periodontal Therapy"]?.map((item, index) => {
        //   console.log("PERIODONTAL", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => props.togglePeriod(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="chart-container my-5">
        {props.oAndM["O&M Surgery"]?.map((item, index) => {
        //   console.log("O&M", item);
          return (
            <div key={index}>
              <label>
                <input type="checkbox" onClick={() => props.toggleOAndM(item.id)} />{" "}
                {item.name}
              </label>
            </div>
          );
        })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div className="chart-container my-5">
        {props.occlusal["Occlusal Therapy"]?.map((item, index) => {
          console.log("OCCULSAL", item);
          return (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  onClick={() => props.toggleOcclusal(item.id)}
                />{" "}
                {item.name}
              </label>
            </div>
          );
        })}
        </div>
      </TabPanel>
    </Box>
  );
}
