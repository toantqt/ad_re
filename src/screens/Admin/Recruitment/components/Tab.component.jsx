import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import JobDescriptionComponent from "../components/JobDescription.components";
import {
  getListsCareer,
  getListsConfig,
  getListsLocation,
} from "../../../../api/AdminAPI";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function TabComponents(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [listsLocation, setListsLocation] = useState([]);
  const [listsCareer, setListsCareer] = useState([]);
  const [config, setConfig] = useState();

  useEffect(async () => {
    if (props.id) {
      await getListsConfig().then((res) => {
        setConfig(res.data[0]);
      });
      await getListsLocation().then((res) => {
        setListsLocation(res.data);
      });
      await getListsCareer().then((res) => {
        setListsCareer(res.data);
      });
    }
  }, [props?.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Mô tả công việc" {...a11yProps(0)} />
          <Tab label="Yêu cầu công việc" {...a11yProps(1)} />
          <Tab label="Quyền lợi được hưởng" {...a11yProps(2)} />
          <Tab label="Thông tin liên hệ" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <JobDescriptionComponent
          config={config}
          listsLocation={listsLocation}
          listsCareer={listsCareer}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Yêu cầu công việc
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Quyền lợi được hưởng
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        Thông tin liên hệ
      </TabPanel>
    </div>
  );
}
