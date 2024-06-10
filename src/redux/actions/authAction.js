import { getUserToken, setUser, setRefreshToken } from '../../utils/useHelper';
import { jwtDecode } from "jwt-decode";
import { LOGIN_SUCCESS, LOGOUT, OTP_SUCCESS } from '../types/types';

export const login = (token, refreshToken) => (dispatch) => {
  setUser(token);
  setRefreshToken(refreshToken);
  const decodedInfo = jwtDecode(token);
  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      token,
      refreshToken,
      role: decodedInfo.role,
      signupCompleted: decodedInfo.isSignupCompleted,
      kycStatus: decodedInfo.kycStatus,
      blacklisted: decodedInfo.isBlacklisted,
      duplicate: decodedInfo.isDuplicate,
      userId: decodedInfo.userId,
    },
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  dispatch({
    type: LOGOUT,
  });
};


export const resendOtp = (otpData) => (dispatch) => {
  dispatch({
    type: OTP_SUCCESS,
    payload: {
      otpData,
    },
  });
};