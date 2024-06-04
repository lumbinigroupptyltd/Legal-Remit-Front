import { getErrorMessage } from "../../../../utils/getErrorMessage";
import {
  addChangeOtpNumber,
  addOtpVerNum,
  addResendVerification,
  getOTPVerify,
} from "../../../../api/auth/signup/otp/otp-api";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate} from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosIntercepters";
import { useDispatch } from "react-redux";
import { resendOtp } from "../../../../redux/actions/authAction";

export const useOtpVerNum = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  return useMutation(["verification"], (formData) => addOtpVerNum(formData), {
    onSuccess: (data, variables, context) => {
    
      // if (variables?.otp) {
      //   toast.success("OTP verified successfully");
      //   navigate("/login");
      // } else {
      //   toast.success("OTP send successfully");
      // }
      onSuccess && onSuccess(data, variables, context);
      dispatch(resendOtp(data?.data));
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useGetOtpVerify = ({ onSuccess }) => {
  const navigate = useNavigate();
  return useMutation(["otpVerification"], (formData) => getOTPVerify(formData), {
    onSuccess: (data, variables, context) => {
      if (variables?.otp) {
        toast.success("OTP verified successfully");
        navigate("/login");
      }
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};


export const useResendOtpVerNum = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["verification"], (otpData) => addResendVerification(otpData), {
    onSuccess: (data, variables, context) => {
      toast.success("code re-send Successfully");
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

{
  /*________________________GET_____________________________________*/
}
export const useChangeOtpNumber = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["addsignup"],
    (formData) => addChangeOtpNumber(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success("");
        onSuccess && onSuccess(data, variables, context);
        queryClient.invalidateQueries("");
      },
      onError: (err, _variables, _context) => {
        toast.error(getErrorMessage(err));
      },
    }
  );
};
