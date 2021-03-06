import React from "react";
import { useEffect, useState } from "react";
import {
  getCountCandidate,
  getListsCandidate,
  covertDate,
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
import "./candidate.css";

const CandidateScreens = (props) => {
  const history = useHistory();
  const [count, setCount] = useState(2);
  const [page, setPage] = useState(0);
  const [listsCandidate, setListsCandidate] = useState([]);
  useEffect(async () => {
    props.handleLoading(true);
    await getCountCandidate().then((res) => {
      setCount(res.data);
    });
    await getListsCandidate(page).then((res) => {
      setListsCandidate(res.data);
    });
    props.handleLoading(false);
  }, [page]);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "Họ tên", width: 200 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 180 },
    { field: "address", headerName: "Địa chỉ", width: 300 },
    { field: "level", headerName: "Học vấn", width: 180 },
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
                // handleClickView(action.row?.action);
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

  const rows = listsCandidate.map((e, index) => {
    console.log(e);
    return {
      id: index,
      stt: index + 1,
      name: e?.profile?.fullName,
      phoneNumber: e?.profile?.phoneNumber,
      address: e?.profile?.address,
      level: e?.cv?.information?.level,
      created: covertDate(e?.cv?.created),
      action: e,
    };
  });

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClick = () => {
    history.push(AdminSlug.CREATE_CANDIDATE);
  };

  const hanldeClickEditor = () => {
    history.push(AdminSlug.CANDIDATEEDITOR);
  };
  return (
    <Grid>
      <div className="header-title">
        <span>Danh sách ứng viên:</span>
        <span className="ml-3 btn-cadidate btn-candidate-active">
          Người dùng
        </span>
        <span className="ml-3 btn-cadidate" onClick={hanldeClickEditor}>
          Được tạo
        </span>

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
    </Grid>
  );
};

export default CandidateScreens;
