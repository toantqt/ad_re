import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import InputComponent from "../../../../components/Input/Input.component";
import {
  createDescription,
  getListsCareer,
  getListsConfig,
  getListsLocation,
} from "../../../../api/AdminAPI";
import SelectComponent from "../../../../components/Input/Select.component";
import MultiSelectComponent from "../../../../components/Input/MultiSelect.component";
import InputDateComponent from "../../../../components/Input/InputDate.component";
import { Button } from "@material-ui/core";

const JobDescriptionComponents = (props) => {
  const [listsInfor, setListsInfor] = useState([
    { title: "Cấp bậc", name: "position" },
    { title: "Giới tính", name: "gender" },
    { title: "Hình thức làm việc", name: "workingType" },
    { title: "Địa điểm làm việc", name: "address" },
    { title: "Mức lương", name: "salary" },
    { title: "Hạn nộp ", name: "deadline" },
  ]);

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

  const [data, setData] = useState({
    experience: "",
    number: "",
    degree: "",
    position: "",
    gender: "",
    workingType: "",
    address: "",
    salary: "",
    deadline: "",
    jobName: "",
  });

  const [listsLocation, setListsLocation] = useState([]);
  const [listsCareer, setListsCareer] = useState([]);
  const [careers, setCareers] = useState([]);

  const [config, setConfig] = useState();

  useEffect(async () => {
    await getListsConfig().then((res) => {
      setConfig(res.data[0]);
    });
    await getListsLocation().then((res) => {
      setListsLocation(res.data);
    });
    await getListsCareer().then((res) => {
      setListsCareer(res.data);
    });
  }, []);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    if (name == "deadline") {
      value = new Date(value).getTime();
    }
    console.log(value);

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmitCreated = async () => {
    const newData = { ...data };
    newData.listsCarrer = careers;
    props.handleLoading(true);
    await createDescription(props.recruitmentID, newData).then((res) => {
      props.handleLoading(false);
    });
  };

  const handleChangeListsCareer = (event) => {
    const arr = [];
    for (let item of event) {
      arr.push({ name: item.value });
    }
    setCareers(arr);
  };
  return (
    <Grid container spacing={2}>
      <Grid item lg={4}>
        <InputComponent
          title="Tên Công việc"
          name="jobName"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <InputComponent
          title="Số lượng"
          name="number"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Kinh nghiệm"
          option={config?.listsExperience}
          name="experience"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Bằng cấp"
          option={config?.listsLevel}
          name="degree"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Cấp bậc"
          option={config?.litsPosition}
          name="position"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Giới tính"
          option={listsGender}
          name="gender"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Hình thức làm việc"
          option={config?.listsWorkingType}
          name="workingType"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Địa điểm làm việc"
          option={listsLocation}
          name="address"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <SelectComponent
          title="Mức lương"
          option={config?.litsSalary}
          name="salary"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
        <InputDateComponent
          name="deadline"
          handleChangeInput={handleChangeInput}
        />
      </Grid>
      <Grid item lg={4}>
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
  );
};

export default JobDescriptionComponents;
