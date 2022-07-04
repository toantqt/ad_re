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
                        Mức lương:
                        {props?.data?.recruitment?.description?.salary}{" "}
                      </span>
                    </Grid>
                    <Grid item lg={3}>
                      <span>
                        Hạn nộp hồ sơ:
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
                    Kinh nghiệm:{" "}
                    {props?.data?.recruitment?.description?.experience}
                  </span>
                </li>
                <li>
                  <span>
                    Yêu cầu bằng cấp:{" "}
                    {props?.data?.recruitment?.description?.degree ||
                      "Không yêu cầu"}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    Số lượng cần tuyển:{" "}
                    {props?.data?.recruitment?.description?.number}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    Ngành nghề:{" "}
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
                    Chức vụ: {props?.data?.recruitment?.description?.position}
                  </span>
                </li>
                <li>
                  <span>
                    Yêu cầu giới tính:{" "}
                    {props?.data?.recruitment?.description?.gender}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    Hình thức làm việc:{" "}
                    {props?.data?.recruitment?.description?.workingType}{" "}
                  </span>
                </li>
                <li>
                  <span>
                    Địa điểm làm việc:{" "}
                    {props?.data?.recruitment?.description?.address}
                  </span>
                </li>
              </ul>
            </Grid>
            <Grid item lg={12}>
              <div style={{ padding: "20px" }}>
                <div className="requirement-title">
                  <span>Mô tả công việc</span>
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
                  <span>Yêu cầu công việc</span>
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
                  <span>Quyền lợi được hưởng</span>
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
                  <span>Yêu cầu hồ sơ</span>
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
                  <span>Thông tin liên hệ</span>
                </div>
                <div className="requirement-information">
                  <span>
                    Người liên hệ: {props?.data?.recruitment?.contact?.fullName}
                  </span>
                </div>
                <div className="requirement-information">
                  <span>
                    Địa chỉ: {props?.data?.recruitment?.contact?.address}
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
