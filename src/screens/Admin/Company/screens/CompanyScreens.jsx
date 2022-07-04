import React from "react";
import { useEffect, useState } from "react";
import {
  getCountCompany,
  getListsCompany,
  covertDate,
  createRecruitment,
} from "../../../../api/AdminAPI";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ModalCompanyComponent from "../../../../components/Modal/ModalCompany.component";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

const CompanyScreens = (props) => {
  const history = useHistory();
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(0);
  const [listsCompany, setListsCompany] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [companySelect, setCompanySelect] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await getCountCompany().then((res) => {
      setCount(res.data);
      props.handleLoading(false);
    });
  }, []);

  useEffect(async () => {
    await getListsCompany(page).then((res) => {
      setListsCompany(res.data);
    });
  }, [page]);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "Tên Công Ty", width: 300 },
    { field: "type", headerName: "Loại Hình", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 400 },
    { field: "fieldActivity", headerName: "Lĩnh vực hoạt động", width: 250 },
    { field: "verified", headerName: "Xác thực", width: 160 },
    { field: "created", headerName: "Ngày tạo", width: 150 },
    {
      field: "action",
      headerName: "Chức năng",
      width: 250,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-1"
              onClick={() => {
                handleClickView(action.row?.action);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            {action.row.action.email == "" &&
            action.row.action.password == "" ? (
              <IconButton
                className="btn-action btn-a-4"
                style={{ color: "orange" }}
                onClick={() => {
                  handleClickCreate(action.row?.action?._id);
                }}
              >
                <NoteAddIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ];

  const rows = listsCompany.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      name: e?.companyName,
      type: e?.typeActivity,
      address: e?.address,
      fieldActivity: e?.fieldActivity,
      verified: e?.verified,
      created: covertDate(e?.created),
      action: e,
    };
  });

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClickView = (data) => {
    setCompanySelect(data);
    setOpenModal(true);
  };

  const handlCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = () => {
    history.push(AdminSlug.CREATE_COMPANY);
  };

  const handleClickCreate = async (id) => {
    props.handleLoading(true);
    await createRecruitment(id).then((res) => {
      history.push({
        pathname: AdminSlug.CREATE_RECRUITMENT,
        search: `?id=${res.data._id}`,
      });
    });
  };

  return (
    <Grid>
      <div className="header-title">
        <span>Danh sách công ty:</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClick}
        >
          Thêm mới
        </Button>
      </div>
      <div className="mt-3">
        <TableComponent
          columns={columns}
          rows={rows}
          count={count}
          page={page}
          handleChangePage={handleChangePage}
        />
      </div>
      <ModalCompanyComponent
        open={openModal}
        handleClose={handlCloseModal}
        company={companySelect}
      />
    </Grid>
  );
};

export default CompanyScreens;
