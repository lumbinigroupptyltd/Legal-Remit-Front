import Axios from "axios";
import { getBaseUrl } from "./getBaseUrl";
import { logout } from "./logout";
import { jwtDecode } from "jwt-decode";
import { CancelToken } from "axios";

const envType = import.meta.env.MODE;
const BASEURL = getBaseUrl();
const UNAUTHORIZED = 401;

const navigateOnError = () => {
  if (envType === "development") {
    return window.location.replace("/#/login");
  } else {
    return window.location.replace("/#/login");
  }
};

export const axiosInstance = Axios.create({
  baseURL: BASEURL,
  timeout: 20000,
});

axiosInstance.defaults.headers["Access-Control-Allow-Origin"] = "*";

axiosInstance.interceptors.request.use(
  (config) => {
    
    try {
      const openRouteKeywords = [
        'signin',
        'getallcontactus_details',
        'getissueauthoritybynationality',
        'getallcountries',
        'businessdetails/create'
      ];
      const token = localStorage.getItem("token");
      const validToken = !checkIfExpired(token);
      if (token && validToken) {
        if (!openRouteKeywords.some(keyword => config.url.endsWith(keyword))) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          logout();
          // navigateOnError();
          return config;
        }
      }
    } catch (err) {
      console.log(err);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      try {
        logout();
        navigateOnError();
      } catch (e) {
        console.log(e);
      }
    }

    if (error.response === UNAUTHORIZED) {
      try {
        logout();
      } catch (e) {
        console.log(e);
      }
    }
    return Promise.reject(error);
  }
);

export const checkIfExpired = (token) => {
  if (token && jwtDecode(token)) {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    const iat = decoded.iat;
    const now = new Date();
    if (now.getTime() > exp * 1000) {
      return true;
    }
    if (now.getTime() < iat * 10 - 60000) {
      alert("Wrong System Time \n Please correct your system time");
      return true;
    }
    return false;
  }
  return true;
};

const cancelTokenSource = Axios.CancelToken.source();

axiosInstance.interceptors.request.use(
  (config) => {
    config.cancelToken = cancelTokenSource.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const cancelToken = cancelTokenSource.token;
