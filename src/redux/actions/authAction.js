import { getUserToken, setUser, setRefreshToken } from '../../utils/useHelper';
import { jwtDecode } from "jwt-decode";
import { LOGIN_SUCCESS, LOGOUT } from '../types/types';

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
      verified: decodedInfo.isSignupCompleted,
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
