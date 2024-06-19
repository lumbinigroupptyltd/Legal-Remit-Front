import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { addLogin } from "../../../api/auth/login/login-api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setRefreshToken, setUser } from "../../../utils/useHelper";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/authAction";

const handleNavigation = (decodedInfo, navigate) => {
  if (decodedInfo?.isAdminResetPwd) {
    navigate("/changepassword");
    return;
  }

  switch (decodedInfo?.role) {
    case "ADMIN":
      navigate("/dashboard");
      break;
    case "INDIVIDUAL":
    case "BUSINESS":
      if (!decodedInfo?.isSignupCompleted) {
        navigate("/profile");
      } else {
        navigate("/home");
      }
      break;
    default:
      navigate("/login");
      break;
  }
};


{
  /*________________________POST_____________________________________*/
}

export const useLogin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation(["addsignup"], (formData) => addLogin(formData), {
    onSuccess: (data, variables, context) => {
      toast.success("Login successful");
      onSuccess && onSuccess(data, variables, context);
      const token = data?.data?.token;
      const refreshToken = data?.data?.refreshToken;
      dispatch(login(token, refreshToken));
      const decodedInfo = jwtDecode(token);
      handleNavigation(decodedInfo, navigate);
      // if (decodedInfo?.role === "ADMIN") {
      //   navigate("/dashboard");
      // } else if ((decodedInfo?.role === "USER" || decodedInfo?.role === "BUSINESS") && !decodedInfo?.isSignupCompleted) {
      //   navigate("/profile");
      // } else if ((decodedInfo?.role === "USER" || decodedInfo?.isSignupCompleted)) {
      //   navigate("/home");
      // } else if ((decodedInfo?.isAdminResetPwd)) {
      //   navigate("/changepassword");
      // }
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};
