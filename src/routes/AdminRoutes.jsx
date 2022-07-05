import { Redirect, Route, Switch } from "react-router-dom";
import adminSlug from "../resources/AdminSlug";
import CandidateEditor from "../screens/Admin/Candidate/screens/CandidateEditorScreens";
import CandidateScreens from "../screens/Admin/Candidate/screens/CandidateScreens";
import CreateCandidateScreens from "../screens/Admin/Candidate/screens/CreateCandidateScreens";
import CompanyScreens from "../screens/Admin/Company/screens/CompanyScreens";
import CreateCompanyScreens from "../screens/Admin/Company/screens/CreateCompanyScreens";
import CreateRecruitmentScreens from "../screens/Admin/Recruitment/screens/CreateRecruitmentScreens";
import RecruitmentScreens from "../screens/Admin/Recruitment/screens/RecruitmentScreens";

const AdminRoutes = (props) => {
  const handleLoading = props.handleLoading;
  return (
    <Switch>
      <Route
        exact
        path={adminSlug.COMPANY}
        render={() => {
          return <CompanyScreens handleLoading={handleLoading} />;
        }}
      ></Route>

      <Route
        exact
        path={adminSlug.CANDIDATE}
        render={() => {
          return <CandidateScreens handleLoading={handleLoading} />;
        }}
      ></Route>
      <Route
        exact
        path={adminSlug.RECRUITMENTS}
        render={() => {
          return <RecruitmentScreens handleLoading={handleLoading} />;
        }}
      ></Route>
      <Route
        exact
        path={adminSlug.CREATE_COMPANY}
        render={() => {
          return <CreateCompanyScreens handleLoading={handleLoading} />;
        }}
      ></Route>

      <Route
        exact
        path={adminSlug.CREATE_RECRUITMENT}
        render={(props) => {
          return (
            <CreateRecruitmentScreens
              handleLoading={handleLoading}
              {...props}
            />
          );
        }}
      ></Route>

      <Route
        exact
        path={adminSlug.CREATE_CANDIDATE}
        render={(props) => {
          return (
            <CreateCandidateScreens handleLoading={handleLoading} {...props} />
          );
        }}
      ></Route>

      <Route
        exact
        path={adminSlug.CANDIDATEEDITOR}
        render={(props) => {
          return <CandidateEditor handleLoading={handleLoading} {...props} />;
        }}
      ></Route>
    </Switch>
  );
};

export default AdminRoutes;
