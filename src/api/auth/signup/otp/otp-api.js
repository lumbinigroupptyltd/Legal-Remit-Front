import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../../utils/axiosIntercepters";
import { resendOtp } from "../../../../redux/actions/authAction";

{
  /*________________________POST_____________________________________*/
}
export const addOtpVerNum = async ({formData}) => {
  const { data } = await axiosInstance.post('/otp/send', {
    phone: formData.phoneNumber,
    phoneCode: formData.phoneCode
  });
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getOTPVerify = async (formData) => {
  const dispatch = useDispatch(formData);
  dispatch(resendOtp(formData));
  const { data } = await axiosInstance.get(`/otp/getbyotp/${formData?.otp}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addResendVerification = async ({otpData}) => {
  const data = await axiosInstance.patch("/otp/updateByPhone", {id: otpData?.id, phone: otpData?.phone, phoneCode: otpData?.phoneCode});
  return data;
};
 
{
  /*________________________POST_____________________________________*/
}
export const addChangeOtpNumber = async (formData) => {
    const data = await axiosInstance.get(`/otp/getbyphone/${formData?.change_phone_verify_number}`);
    return data;
  };