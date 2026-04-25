export const BASE_URL = "https://expanse-tracker-backend-zeta.vercel.app";

//apiPATHS
export const API_PATHS = {
  AUTH:{
    LOGIN:"/api/v1/auth/login",
    REGISTER:"/api/v1/auth/register",
    GET_USER_INFO:"/api/v1/auth/getUser"
  },
  DASHBOARD:{
    GET_DATA:"/api/v1/dashboard"
  },
  INCOME:{
    ADD_INCOME:"/api/v1/income/add",
    GET_ALL_INCOME:"/api/v1/income/get",
    DELETE_INCOME:(incomeId) => `/api/v1/${incomeId}`,
    DOWNLOAD_INCOME:"/api/v1/income/downloadexcel"
  },
  EXPANSE:{
    ADD_EXPANSE:"/api/v1/expanse/add",
    GET_ALL_EXPANSE:"/api/v1/expanse/get",
    DELETE_EXPANSE:(expanseId) => `/api/v1/${expanseId}`,
    DOWNLOAD_EXPANSE:"/api/v1/expanse/downloadexcel"
  },
  IMAGE:{
    UPLOAD_IMAGE:"/api/v1/auth/upload-image"
  }
}