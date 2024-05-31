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

export const useOtpVerNum = ({ onSuccess }) => {
  const navigate = useNavigate();
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
  const queryClient = useQueryClient();
  return useMutation(["verification"], (formData) => getOTPVerify(formData), {
    onSuccess: (data, variables, context) => {
      if (variables?.otp) {
        toast.success("OTP verified successfully");
        navigate("/login");
      } else {
        toast.success("OTP send successfully");
      }
      onSuccess && onSuccess(data, variables, context);
      queryClient.invalidateQueries("");
    },
    onError: (err, _variables, _context) => {
      toast.error(getErrorMessage(err));
    },
  });
};

export const useResendOtpVerNum = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["verification"], () => addResendVerification(), {
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
