import axios from "axios";
import { getRole } from "../auth/auth";
import { getAccessToken } from "../auth/auth";
import moment from "moment";

export const covertDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

const url = "http://localhost:6699/api";
// const url = "https://recruitmentd24.herokuapp.com/api";

// const url = "https://salon-oto.herokuapp.com/adminAPI";
// const urlUser = "https://salon-oto.herokuapp.com/api";

const headers = async () => {
  return { Authorization: `${await getAccessToken()}` };
};

export const login = async (data) => {
  return await axios
    .post(`${url}/admin/login`, data)
    .then(async (res) => {
      const token = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
      await localStorage.setItem("userToken", JSON.stringify(token));
      let role;
      await getRole().then((user) => {
        role = user;
      });
      return role;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCountCompany = async () => {
  return await axios
    .get(`${url}/company/count`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsCompany = async (page) => {
  return await axios
    .get(`${url}/company/lists-company/${page}`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getCountCandidate = async () => {
  return await axios
    .get(`${url}/cv/count`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsCandidate = async (page) => {
  return await axios
    .get(`${url}/cv/lists-cv/${page}`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsConfig = async () => {
  return await axios
    .get(`${url}/user/config`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsLocation = async () => {
  return await axios
    .get(`${url}/user/location`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsCareer = async () => {
  return await axios
    .get(`${url}/user/career`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createCompany = async (data) => {
  const formData = new FormData();

  formData.append("companyName", data.companyName);
  formData.append("address", data.address);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("website", data.website);
  formData.append("taxCode", data.taxCode);
  formData.append("scale", data.scale);
  formData.append("typeActivity", data.typeActivity);
  formData.append("fieldActivity", data.fieldActivity);
  formData.append("logo", data.logo);
  formData.append("background", data.background);

  return await axios
    .post(`${url}/admin/company`, formData, {
      headers: await headers(),
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const getCountRecruitment = async (type) => {
  return await axios
    .get(`${url}/recruitment/count/${type}`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getListsRecruitment = async (type, page) => {
  return await axios
    .get(`${url}/recruitment/lists/${type}/${page}`)
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createRecruitment = async (id) => {
  return await axios
    .post(
      `${url}/recruitment/${id}`,
      {},
      {
        headers: await headers(),
      }
    )
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createDescription = async (id, data) => {
  return await axios
    .post(`${url}/recruitment/description/${id}`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createBenefit = async (id, data) => {
  console.log(id, data);
  return await axios
    .post(`${url}/recruitment/benefits/${id}`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createRequirement = async (id, data) => {
  return await axios
    .post(`${url}/recruitment/requirement/${id}`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const createContact = async (id, data) => {
  return await axios
    .post(`${url}/recruitment/contact/${id}`, data, {
      headers: await headers(),
    })
    .then(async (res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response;
    });
};
