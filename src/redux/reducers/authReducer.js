import { getUserToken } from '../../utils/useHelper';
import { jwtDecode } from "jwt-decode";
import { LOGIN_SUCCESS, LOGOUT } from '../types/types';


const initialState = {
  token: getUserToken() || null,
  validToken: getUserToken() ? true : false,
  role: null,
  verified: false,
};

if (initialState.token) {
  const decodedInfo = jwtDecode(initialState.token);
  initialState.role = decodedInfo.role;
  initialState.verified = decodedInfo.isSignupCompleted;
  initialState.isSignupCompleted = decodedInfo.isSignupCompleted;
  initialState.isBlacklisted = decodedInfo.isBlacklisted;
  initialState.userId = decodedInfo.userId;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        validToken: true,
        role: action.payload.role,
        userId: action.payload.userId,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        validToken: false,
        role: null,
        verified: false,
      };
    default:
      return state;
  }
};

export default authReducer;
