import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import InputComponent from "../../../../components/Input/Input.component";
import { createContact } from "../../../../api/AdminAPI";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
const JobContactComponents = (props) => {
  const history = useHistory();
  const [listsInfor, setListsInfor] = useState([
    { title: "Người nhận", name: "fullName" },
    { title: "Địa chỉ", name: "address" },
  ]);

  const [data, setData] = useState({
    fullName: "",
    address: "",
  });

  const handleChangeInput = (event) => {
    let { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const showLists = listsInfor.map((e, index) => {
    return (
      <Grid item lg={12}>
        <InputComponent
          title={e.title}
          name={e.name}
          handleChangeInput={handleChangeInput}
        />
      </Grid>
    );
  });
  const handleSubmitCreated = async () => {
    props.handleLoading(true);
    await createContact(props.recruitmentID, data).then((res) => {
      history.push(AdminSlug.RECRUITMENTS);
    });
  };

  return (
    <Grid container spacing={2}>
      {showLists}
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

export default JobContactComponents;
