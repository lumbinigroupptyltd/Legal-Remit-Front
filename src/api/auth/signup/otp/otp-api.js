import { axiosInstance } from "../../../../utils/axiosIntercepters";

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
  const { data } = await axiosInstance.get(`/otp/verify/${formData?.otp}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addResendVerification = async ({otpData}) => {
  const data = await axiosInstance.post("/otp/send", {phone: otpData?.phone, phoneCode: otpData?.phoneCode});
  return data;
};
 
{
  /*________________________POST_____________________________________*/
}
export const addChangeOtpNumber = async (formData) => {
    const {data} = await axiosInstance.patch('/user/update', {
    phone: formData.phone,
    phoneCode: formData.phoneCode,
    id: formData?.userIdData?.data,
  });
  return data;
  };