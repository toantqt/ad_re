import React from "react";
import { useEffect, useState } from "react";
import {
  covertDate,
  getCountRecruitment,
  getListsRecruitment,
} from "../../../../api/AdminAPI";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import AdminSlug from "../../../../resources/AdminSlug";
import ModalRecruitmentComponent from "../../../../components/Modal/ModalRecruitment.component";

const RecruitmentScreens = (props) => {
  const history = useHistory();
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(0);
  const [listsRecruitment, setListsRecruitment] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [companySelect, setCompanySelect] = useState();
  useEffect(async () => {
    props.handleLoading(true);
    await getCountRecruitment(1).then((res) => {
      setCount(res.data);
    });
    await getListsRecruitment(0, page).then((res) => {
      setListsRecruitment(res.data);
    });
    props.handleLoading(false);
  }, [page]);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "Công việc", width: 250 },
    { field: "company", headerName: "Công ty", width: 250 },
    { field: "salary", headerName: "Lương", width: 200 },
    { field: "address", headerName: "Nơi làm việc", width: 150 },
    { field: "number", headerName: "Số lượng", width: 130 },
    { field: "deadline", headerName: "Hạn nộp", width: 160 },
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

            {/* <IconButton
              aria-label="delete"
              className="btn-action btn-a-2"
              onClick={() => {
                // handleClickEdit(action.row?.action?._id);
              }}
            >
              <EditIcon />
            </IconButton> */}
          </>
        );
      },
    },
  ];

  const rows = listsRecruitment.map((e, index) => {
    console.log(e);
    return {
      id: index,
      stt: index + 1,
      name: e?.recruitment?.description?.jobName,
      company: e?.company?.companyName,
      salary: e?.recruitment?.description?.salary,
      number: e?.recruitment?.description?.number,
      address: e?.recruitment?.description?.address,
      deadline: covertDate(parseInt(e?.recruitment?.description?.deadline)),
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
    history.push(AdminSlug.COMPANY);
  };

  return (
    <Grid>
      <div className="header-title">
        <span>Tin tuyển dụng:</span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={() => {
            handleClick();
          }}
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
      <ModalRecruitmentComponent
        open={openModal}
        handleClose={handlCloseModal}
        data={companySelect}
      />
    </Grid>
  );
};

export default RecruitmentScreens;
