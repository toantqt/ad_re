import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { createRequirement } from "../../../../api/AdminAPI";

const JobRequirementComponent = (props) => {
  const [data, setData] = useState({
    information: "",
    jobRequirement: "",
    profileRequirement: "",
  });

  const handleChangeInput = (event) => {
    let { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmitCreated = async () => {
    props.handleLoading(true);
    await createRequirement(props.recruitmentID, data).then((res) => {
      props.handleLoading(false);
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} className="mt-2">
        <div style={{ fontWeight: "500" }} className="mb-2">
          <span>Thông tin công việc</span>
        </div>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Thông tin về công việc"
          style={{ width: "100%" }}
          minRows={4}
          name="information"
          onChange={handleChangeInput}
        />
      </Grid>
      <Grid item lg={12} className="mt-2">
        <div style={{ fontWeight: "500" }} className="mb-2">
          <span>Yêu cầu công việc</span>
        </div>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Thông tin về công việc"
          style={{ width: "100%" }}
          minRows={4}
          name="jobRequirement"
          onChange={handleChangeInput}
        />
      </Grid>
      <Grid item lg={12} className="mt-2">
        <div style={{ fontWeight: "500" }} className="mb-2">
          <span>Yêu cầu hồ sơ</span>
        </div>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Thông tin về công việc"
          style={{ width: "100%" }}
          minRows={4}
          name="profileRequirement"
          onChange={handleChangeInput}
        />
      </Grid>
      <Grid item lg={12} className="mt-2">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{
            textTransform: "none",
            float: "right",
            marginTop: "20px",
          }}
          onClick={handleSubmitCreated}
        >
          Xác nhận
        </Button>
      </Grid>
    </Grid>
  );
};

export default JobRequirementComponent;
