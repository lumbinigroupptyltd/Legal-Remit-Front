import { jwtDecode } from "jwt-decode";
import { checkIfExpired } from "./axiosIntercepters";

export const getUser = () => {
  const auth = localStorage?.getItem("token");
  if (auth) {
    // const { authToken } = JSON.parse(auth);
    const decodedInfo = jwtDecode(auth);
    return decodedInfo;
  } else {
    return {};
  }
};

export const setUser = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const isAuthenticated = () => {
  const data = getUserToken();
  return data ? true : false;
};

export const getUserToken = () => {
  return localStorage.getItem("token");
};

export const getValidToken = () => {
  const token = localStorage.getItem("token");
  const validtoken = !checkIfExpired(token);
  return validtoken;
};
