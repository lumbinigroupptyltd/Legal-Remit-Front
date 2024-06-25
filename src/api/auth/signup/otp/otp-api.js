import { coreAxiosInstance } from "../../../../utils/axiosIntercepters";

{
  /*________________________POST_____________________________________*/
}
export const addOtpVerNum = async ({formData}) => {
  const { data } = await coreAxiosInstance.post('/otp/send', {
    phone: formData.phoneNumber,
    phoneCode: formData.phoneCode
  });
  return data;
};

{
  /*________________________GET_____________________________________*/
}
export const getOTPVerify = async (formData) => {
  const { data } = await coreAxiosInstance.get(`/otp/verify/${formData?.otp}`);
  return data;
};

{
  /*________________________POST_____________________________________*/
}
export const addResendVerification = async ({otpData}) => {
  const data = await coreAxiosInstance.post("/otp/send", {phone: otpData?.phone, phoneCode: otpData?.phoneCode});
  return data;
};
 
{
  /*________________________POST_____________________________________*/
}
export const addChangeOtpNumber = async (formData) => {
    const {data} = await coreAxiosInstance.patch('/user/update', {
    phoneNumber: formData.phone,
    phoneCode: formData.phoneCode,
    id: formData?.userIdData?.data,
  });
  return data;
  };