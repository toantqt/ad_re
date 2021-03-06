import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import { covertDate } from "../../api/AdminAPI";
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

export default function ModalRecruitmentComponent(props) {
  const classes = useStyles();
  console.log(props?.data);
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
        <Grid className="wrap-recruitment">
          <Grid container spacing={2}>
            <Grid item lg={2}>
              <div>
                <img
                  src={props?.data?.company?.logo?.url}
                  alt=""
                  width="100%"
                />
              </div>
            </Grid>
            <Grid item lg={10}>
              <div className="header-recruitment">
                <div className="recruitment-jobName">
                  <span>{props?.data?.recruitment?.description?.jobName}</span>
                </div>
                <div className="recruitment-company mt-1">
                  <span>{props?.data?.company?.companyName}</span>
                </div>
                <div className="recruitment-address mt-1">
                  <span>{props?.data?.company?.address}</span>
                </div>
                <div className="recruitment-salary mt-1">
                  <Grid container spacing={2}>
                    <Grid item lg={3}>
                      <span>
                        M???c l????ng:
                        {props?.data?.recruitment?.description?.salary}{" "}
                      </span>
                    </Grid>
                    <Grid item lg={3}>
                      <span>
                        H???n n???p h??? s??:
                        {covertDate(
                          parseInt(
                            props?.data?.recruitment?.description?.deadline
                          )
                        )}{" "}
                      </span>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item lg={6}>
              <ul className="recruitment-description">
                <li>
                  <span>
                    Kinh nghi???m:{" "}
                    {props?.data?.recruitment?.description?.experience}
                  </span>
                </li>
                <li>
                  <span>
                    Y??u c???u b???ng c???p:{" "}
                    {props?.data?.recruitment?.description?.degree ||
                      "Kh??ng y??u c???u"}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    S??? l?????ng c???n tuy???n:{" "}
                    {props?.data?.recruitment?.description?.number}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    Ng??nh ngh???:{" "}
                    {props?.data?.recruitment?.description?.listsCarrer?.map(
                      (e, index) => {
                        return <span>{e.name}, </span>;
                      }
                    )}{" "}
                  </span>
                </li>
              </ul>
            </Grid>
            <Grid item lg={6}>
              <ul className="recruitment-description">
                <li>
                  <span>
                    Ch???c v???: {props?.data?.recruitment?.description?.position}
                  </span>
                </li>
                <li>
                  <span>
                    Y??u c???u gi???i t??nh:{" "}
                    {props?.data?.recruitment?.description?.gender}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    H??nh th???c l??m vi???c:{" "}
                    {props?.data?.recruitment?.description?.workingType}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    ?????a ??i???m l??m vi???c:{" "}
                    {props?.data?.recruitment?.description?.address}
                  </span>
                </li>
              </ul>
            </Grid>
            <Grid item lg={12}>
              <div style={{ padding: "20px" }}>
                <div className="requirement-title">
                  <span>M?? t??? c??ng vi???c</span>
                </div>
                <div className="requirement-information">
                  <span>
                    {props?.data?.recruitment?.requirement?.information}
                  </span>
                </div>
              </div>
            </Grid>
            <Grid item lg={12}>
              <div style={{ padding: "20px" }}>
                <div className="requirement-title">
                  <span>Y??u c???u c??ng vi???c</span>
                </div>
                <div className="requirement-information">
                  <span>
                    {props?.data?.recruitment?.requirement?.jobRequirement}
                  </span>
                </div>
              </div>
            </Grid>
            <Grid item lg={12}>
              <div style={{ padding: "20px" }}>
                <div className="requirement-title">
                  <span>Quy???n l???i ???????c h?????ng</span>
                </div>
                <div className="requirement-information">
                  <Grid container spacing={2}>
                    {props?.data?.recruitment?.benefits?.listsBenefit.map(
                      (e, index) => {
                        return (
                          <Grid item lg={4}>
                            <span>{e.name}</span>
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                  <div className="mt-2">
                    <span>{props?.data?.recruitment?.benefits?.content}</span>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item lg={12}>
              <div style={{ padding: "20px" }}>
                <div className="requirement-title">
                  <span>Y??u c???u h??? s??</span>
                </div>
                <div className="requirement-information">
                  <span>
                    {props?.data?.recruitment?.requirement?.profileRequirement}
                  </span>
                </div>
              </div>
            </Grid>
            <Grid item lg={12}>
              <div style={{ padding: "20px" }}>
                <div className="requirement-title">
                  <span>Th??ng tin li??n h???</span>
                </div>
                <div className="requirement-information">
                  <span>
                    Ng?????i li??n h???: {props?.data?.recruitment?.contact?.fullName}
                  </span>
                </div>
                <div className="requirement-information">
                  <span>
                    ?????a ch???: {props?.data?.recruitment?.contact?.address}
                  </span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
