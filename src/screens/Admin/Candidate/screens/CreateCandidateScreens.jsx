import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputComponent from "../../../../components/Input/Input.component";
import SelectComponent from "../../../../components/Input/Select.component";
import MultiSelectComponent from "../../../../components/Input/MultiSelect.component";
import {
  createCandidate,
  getListsCareer,
  getListsConfig,
  getListsLocation,
} from "../../../../api/AdminAPI";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";

const CreateCandidateScreens = (props) => {
  const history = useHistory();
  const [listsGender, setListsGender] = useState([
    {
      gender: "Không yêu cầu",
    },
    {
      gender: "Nam",
    },
    {
      gender: "Nữ",
    },
  ]);

  const [listsLocation, setListsLocation] = useState([]);
  const [listsCareer, setListsCareer] = useState([]);
  const [careers, setCareers] = useState([]);

  const [config, setConfig] = useState();
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    address: "",
    experience: "",
    workplace: "",
  });

  useEffect(async () => {
    props.handleLoading(true);
    await getListsConfig().then((res) => {
      setConfig(res.data[0]);
    });
    await getListsLocation().then((res) => {
      setListsLocation(res.data);
    });
    await getListsCareer().then((res) => {
      setListsCareer(res.data);
    });
    props.handleLoading(false);
  }, []);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleChangeListsCareer = (event) => {
    const arr = [];
    for (let item of event) {
      arr.push({ name: item.value });
    }
    setCareers(arr);
  };

  const handleSubmitCreated = async () => {
    const newData = { ...data };
    newData.career = careers;
    props.handleLoading(true);
    await createCandidate(newData).then((res) => {
      props.handleLoading(false);

      if (res.status == 409 || res.status == 500) {
        alert("Email hoặc số điện thoại đã được tạo trước đó");
      } else {
        history.goBack();
      }
    });
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Thêm mới ứng viên:</span>
      </div>
      <div className="mt-3">
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <InputComponent
              title="Họ tên"
              name="fullName"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={6}>
            <InputComponent
              title="Email"
              name="email"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={6}>
            <InputComponent
              title="Điện thoại"
              name="phoneNumber"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={6}>
            <InputComponent
              title="Địa chỉ"
              name="address"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={3}>
            <SelectComponent
              title="Giới tính"
              option={listsGender}
              name="gender"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={3}>
            <SelectComponent
              title="Kinh nghiệm"
              option={config?.listsExperience}
              name="experience"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={3}>
            <SelectComponent
              title="Địa điểm làm việc"
              option={listsLocation}
              name="workplace"
              handleChangeInput={handleChangeInput}
            />
          </Grid>
          <Grid item lg={3}>
            <MultiSelectComponent
              option={listsCareer}
              handleChangeInput={handleChangeListsCareer}
            />
          </Grid>
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
      </div>
    </Grid>
  );
};

export default CreateCandidateScreens;
