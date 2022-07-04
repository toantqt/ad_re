import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import { createBenefit } from "../../../../api/AdminAPI";
const JobBenefitsComponent = (props) => {
  const [listsBenefit, ListsBenefit] = useState([
    { name: "Chế độ bảo hiểm" },
    { name: "Tăng lương" },
    { name: "Phụ cấp" },
    { name: "Du lịch" },
    { name: "Xe đưa đón" },
    { name: "Nghỉ phép năm" },
    { name: "Chế độ thưởng" },
    { name: "Laptop" },
    { name: "Phụ cấp thâm niên" },
    { name: "CLB thể thao" },
    { name: "Đồng phục" },
    { name: "Đào tạo" },
    { name: "Công tác phí" },
    { name: "Chăm sóc sức khỏe" },
    { name: "Du lịch nước ngoài" },
  ]);

  const [benefit, setBenefit] = useState([]);
  const check = false;

  const handleClick = (data) => {
    setBenefit((benefit) => [...benefit, data]);
  };

  const showListsBenefit = listsBenefit.map((e, index) => {
    let checked = false;
    let id;
    for (let item of benefit) {
      if (e.name === item.name) {
        checked = true;
      }
    }
    return (
      <Grid item lg={3}>
        <Grid container>
          <Grid item lg={3}>
            <Checkbox
              name="checkedB"
              key={index}
              checked={checked}
              color="primary"
              onClick={() => handleClick(e)}
            />
          </Grid>
          <Grid item lg={9} style={{ padding: "10px" }}>
            <span>{e.name}</span>
          </Grid>
        </Grid>
      </Grid>
    );
  });

  const handleSubmitCreated = async () => {
    const data = {
      listsBenefit: benefit,
    };
    props.handleLoading(true);
    await createBenefit(props.recruitmentID, data).then((res) => {
      props.handleLoading(false);
    });
  };
  return (
    <Grid container spacing={2}>
      {showListsBenefit}
      <Grid item lg={12}>
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

export default JobBenefitsComponent;
