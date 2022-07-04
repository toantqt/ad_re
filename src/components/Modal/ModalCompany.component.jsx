import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import "./modal.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCompanyComponent(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={props?.open}
        onClose={props?.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props?.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid className="profile-company">
          <div className="header-company">
            <div className="logo-company">
              <img
                src={props?.company?.logo?.url}
                alt=""
                width="100%"
                height="100%"
              />
            </div>
            <div className="name-company">
              <span>{props?.company?.companyName}</span>
            </div>
            <div className="bg-company">
              <img
                src={props?.company?.background?.url}
                alt=""
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <hr />
          <div className="detail-company">
            <Grid container>
              <Grid item lg={4}>
                <span className="item-title">Mã số thuế: </span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">{props?.company?.taxCode}</span>
              </Grid>
              <Grid item lg={4}>
                <span className="item-title">Số điện thoại: </span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">
                  {props?.company?.phoneNumber}
                </span>
              </Grid>
              <Grid item lg={4}>
                <span className="item-title">Website: </span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">{props?.company?.website}</span>
              </Grid>
              <Grid item lg={4}>
                <span className="item-title">Qui mô: </span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">{props?.company?.scale}</span>
              </Grid>
              <Grid item lg={4}>
                <span className="item-title">Loại hình hoạt động: </span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">
                  {props?.company?.typeActivity}
                </span>
              </Grid>
              <Grid item lg={4}>
                <span className="item-title">Lĩnh vực hoạt động:</span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">
                  {props?.company?.fieldActivity}
                </span>
              </Grid>

              <Grid item lg={4}>
                <span className="item-title">Địa chỉ:</span>
              </Grid>
              <Grid item lg={8}>
                <span className="item-content">{props?.company?.address}</span>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Dialog>
    </div>
  );
}
