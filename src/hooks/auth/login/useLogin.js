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
// export const useLogin = ({ onSuccess }) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   return useMutation(["addsignup"], (formData) => addLogin(formData), {
//     onSuccess: (data, variables, context) => {
//       toast.success("Login successful");
//       onSuccess && onSuccess(data, variables, context);
//       const token = data?.data?.token;
//       const refreshToken = data?.data?.refreshToken;
//       setUser(token);
//       setRefreshToken(refreshToken);
//       if (token) {
//         const decodedInfo = jwtDecode(token);
//         if(decodedInfo?.isSignupCompleted){
//           navigate("/dashboard");
//         }else {
//           navigate("/profile");
//         }
//       }
//       queryClient.invalidateQueries("");
//     },
//     onError: (err, _variables, _context) => {
//       toast.error(getErrorMessage(err));
//     },
//   });
// };

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
      if (decodedInfo?.isSignupCompleted) {
        navigate("/dashboard");
      } else {
        navigate("/profile");
      }
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};
