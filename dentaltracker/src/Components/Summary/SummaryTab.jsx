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

export default function SummaryTab(props) {
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
      <TabPanel value={value} index={0} style={{ marginTop: "-50px" }}>
        <div className="chart-container my-5">
          {props.consTxFiltered?.map((item) => {
            return (
              <ul>
                <li>{item.name}</li>
              </ul>
            );
          })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{ marginTop: "-50px" }}>
        <div className="chart-container my-5">
          {props.orthoFiltered?.map((item) => {
            return (
              <ul>
                <li>{item.name}</li>
              </ul>
            );
          })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2} style={{ marginTop: "-50px" }}>
        <div className="chart-container my-5">
          {props.periodFiltered?.map((item) => {
            return (
              <ul>
                <li>{item.name}</li>
              </ul>
            );
          })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3} style={{ marginTop: "-50px" }}>
        <div className="chart-container my-5">
          {props.oAndMFiltered?.map((item) => {
            return (
              <ul>
                <li>{item.name}</li>
              </ul>
            );
          })}
        </div>
      </TabPanel>
      <TabPanel value={value} index={4} style={{ marginTop: "-50px" }}>
        <div className="chart-container my-5">
          {props.occlusalFiltered?.map((item) => {
            return (
              <ul>
                <li>{item.name}</li>
              </ul>
            );
          })}
        </div>
      </TabPanel>
    </Box>
  );
}
