import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { createCompany, getListsConfig } from "../../../../api/AdminAPI";
import InputComponent from "../../../../components/Input/Input.component";
import SelectComponent from "../../../../components/Input/Select.component";
import ButtonUploadImageComponent from "../../../../components/ButtonUploadImage/ButtonUploadImage.component";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";

const CreateCompanyScreens = (props) => {
  const history = useHistory();
  const [listsInfor, setListsInfor] = useState([
    { title: "Tên Công Ty", name: "companyName" },
    { title: "Địa chỉ", name: "address" },
    { title: "Số điện thoại", name: "phoneNumber" },
    { title: "Website", name: "website" },
    { title: "Mã số thuế", name: "taxCode" },
  ]);
  const [listsConfig, setListsConfig] = useState();
  const [logo, setLogo] = useState();
  const [background, setBackground] = useState();
  const [data, setData] = useState({
    companyName: "",
    address: "",
    phoneNumber: "",
    website: "",
    taxCode: "",
    scale: "",
    typeActivity: "",
    fieldActivity: "",
  });
  useEffect(async () => {
    props.handleLoading(true);
    await getListsConfig().then((res) => {
      setListsConfig(res.data[0]);
    });
    props.handleLoading(false);
  }, []);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    console.log(name);
    console.log(value);

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const showListsInfor = listsInfor.map((e, index) => {
    return (
      <Grid item lg={6} key={index}>
        <InputComponent
          title={e.title}
          name={e.name}
          handleChangeInput={handleChangeInput}
        />
      </Grid>
    );
  });

  const addImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          if (event.target.name == "logo") {
            setLogo({ url: reader.result, image: file, type: file.type });
          } else if (event.target.name == "background") {
            setBackground({ url: reader.result, image: file, type: file.type });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const handleSubmitCreated = async () => {
    const newData = { ...data };
    newData.logo = logo?.image;
    newData.background = background?.image;
    props.handleLoading(true);
    await createCompany(newData)
      .then(() => {
        history.push(AdminSlug.COMPANY);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Thêm mới công ty:</span>
      </div>
      <div className="mt-3">
        <Grid container spacing={2}>
          {showListsInfor}
          {listsConfig ? (
            <>
              <Grid item lg={6}>
                <SelectComponent
                  title="Quy mô"
                  option={listsConfig.listsScaleCompany}
                  name="scale"
                  handleChangeInput={handleChangeInput}
                />
              </Grid>
              <Grid item lg={6}>
                <SelectComponent
                  title="Loại hình"
                  option={listsConfig.listsTypeActivity}
                  name="typeActivity"
                  handleChangeInput={handleChangeInput}
                />
              </Grid>
              <Grid item lg={6}>
                <SelectComponent
                  title="Lĩnh vực"
                  option={listsConfig.listsFieldActivity}
                  name="fieldActivity"
                  handleChangeInput={handleChangeInput}
                />
              </Grid>{" "}
            </>
          ) : (
            <></>
          )}
          <Grid item lg={6}>
            <div className="mb-2">
              <span style={{ fontWeight: "500" }}>Ảnh đại diện: </span>
            </div>
            <ButtonUploadImageComponent
              addImage={addImage}
              name="logo"
              img={logo?.url}
            />
          </Grid>
          <Grid item lg={6}>
            <div className="mb-2">
              <span style={{ fontWeight: "500" }}>Ảnh nền: </span>
            </div>
            <ButtonUploadImageComponent
              name="background"
              addImage={addImage}
              img={background?.url}
            />
          </Grid>
        </Grid>
      </div>
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
  );
};

export default CreateCompanyScreens;
