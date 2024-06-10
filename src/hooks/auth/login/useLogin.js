import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { addLogin } from "../../../api/auth/login/login-api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setRefreshToken, setUser } from "../../../utils/useHelper";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/authAction";

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
     
      if (decodedInfo?.role === "ADMIN") {
        navigate("/dashboard");
      } else if ((decodedInfo?.role === "USER" || decodedInfo?.role === "BUSINESS") && decodedInfo?.kycStatus === "REJECTED") {
        navigate("/profile");
      } else if ((decodedInfo?.role === "USER" || decodedInfo?.role === "BUSINESS") && (decodedInfo?.kycStatus === "PENDING" || decodedInfo?.kycStatus === "VERIFIED")) {
        navigate("/home");
      }
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};
