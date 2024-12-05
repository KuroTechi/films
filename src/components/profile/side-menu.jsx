import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FavoriteMoviesCards } from "./favorite-movies-cards";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography component={"div"}>{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          paddingTop: "16px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Избранные фильмы" {...a11yProps(0)} />
          <Tab label="О пользователе" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <FavoriteMoviesCards />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Информация о пользователе
        </TabPanel>
      </Box>
    </>
  );
}

export { VerticalTabs };
