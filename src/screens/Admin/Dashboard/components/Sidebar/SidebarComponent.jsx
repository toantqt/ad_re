import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AdminSlug from "../../../../../resources/AdminSlug";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SendIcon from "@material-ui/icons/Send";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import CategoryIcon from "@material-ui/icons/Category";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./sidebar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: "0px !important",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    color: "black",
  },
}));

export default function SideBarComponent(props) {
  const history = useHistory();
  const classes = useStyles();
  const [param, setParam] = React.useState("categoryManager");
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);

  const handleClickSlug = (param, url) => {
    history.push({
      pathname: url,
      search: `?q=${param}`,
    });
  };
  const handleClickSlugLibrary = (url) => {
    setParam(param);
    history.push({
      pathname: url,
    });
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    <List style={{ padding: "0px !important" }} className="sidebar">
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.COMPANY)}
      >
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Nhà tuyển dụng" className={classes.title} />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.CANDIDATE)}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Ứng viên" className={classes.title} />
      </ListItem>
      <ListItem
        button
        onClick={() => handleClickSlugLibrary(AdminSlug.RECRUITMENTS)}
      >
        <ListItemIcon>
          <MailOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Tin tuyển dụng" className={classes.title} />
      </ListItem>
    </List>
  );
}
