import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TabComponents from "../components/Tab.component";
import queryString from "query-string";
import JobDescriptionComponents from "../components/JobDescription.components";
import JobRequirementComponent from "../components/JobRequirement.component";
import JobContactComponent from "../components/JobContact.component";
import JobBenefitsComponent from "../components/JobBenefits.component";

const CreateRecruitmentScreens = (props) => {
  const search = queryString.parse(props.location.search);
  const id = search.id;
  const [recruitmentID, setRecruitmentID] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    if (id) {
      props.handleLoading(false);
      setRecruitmentID(id);
    }
  }, [id]);
  return (
    <Grid>
      <div className="header-title">
        <span>Tạo tin tuyển dụng:</span>
      </div>
      <Grid container spacing={2} className="mt-3">
        <Grid item lg={12}>
          <div className="header-title mb-2">
            <span>Mô tả công việc: </span>
          </div>
          <JobDescriptionComponents
            recruitmentID={recruitmentID}
            handleLoading={props.handleLoading}
          />
          <hr />
        </Grid>
        <Grid item lg={12}>
          <div className="header-title mb-2">
            <span>Yêu cầu công việc: </span>
          </div>
          <JobRequirementComponent
            recruitmentID={recruitmentID}
            handleLoading={props.handleLoading}
          />
          <hr />
        </Grid>
        <Grid item lg={12}>
          <div className="header-title mb-2">
            <span>Quyền lợi được hưởng</span>
          </div>
          <JobBenefitsComponent
            recruitmentID={recruitmentID}
            handleLoading={props.handleLoading}
          />
          <hr />
        </Grid>
        <Grid item lg={12}>
          <div className="header-title mb-2">
            <span>Thông tin liên hệ</span>
          </div>
          <JobContactComponent
            recruitmentID={recruitmentID}
            handleLoading={props.handleLoading}
          />
          <hr />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateRecruitmentScreens;
